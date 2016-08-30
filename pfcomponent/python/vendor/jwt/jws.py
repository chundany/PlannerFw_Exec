
import binascii
import json
import six

from collections import Mapping

from jose.jwk import get_algorithm_object
from jose.constants import ALGORITHMS
from jose.exceptions import JWSError
from jose.exceptions import JWSSignatureError
from jose.utils import base64url_encode
from jose.utils import base64url_decode


def sign(claims, key, headers=None, algorithm=ALGORITHMS.HS256):
    """Signs a claims set and returns a JWS string.

    Args:
        claims (dict): A claims set to sign
        key (str): The key to use for signing the claim set
        headers (dict, optional): A set of headers that will be added to
            the default headers.  Any headers that are added as additional
            headers will override the default headers.
        algorithm (str, optional): The algorithm to use for signing the
            the claims.  Defaults to HS256.

    Returns:
        str: The string representation of the header, claims, and signature.

    Raises:
        JWSError: If there is an error signing the token.

    Examples:

        >>> jws.sign({'a': 'b'}, 'secret', algorithm='HS256')
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoiYiJ9.jiMyrsmD8AoHWeQgmxZ5yq8z0lXS67_QGs52AzC8Ru8'

    """

    if algorithm not in ALGORITHMS.SUPPORTED:
        raise JWSError('Algorithm %s not supported.' % algorithm)

    encoded_header = _encode_header(algorithm, additional_headers=headers)
    encoded_claims = _encode_claims(claims)
    signed_output = _sign_header_and_claims(encoded_header, encoded_claims, algorithm, key)

    return signed_output


def verify(token, key, algorithms, verify=True):
    """Verifies a JWS string's signature.

    Args:
        token (str): A signed JWS to be verified.
        key (str): A key to attempt to verify the payload with.
        algorithms (str or list): Valid algorithms that should be used to verify the JWS.

    Returns:
        dict: The dict representation of the claims set, assuming the signature is valid.

    Raises:
        JWSError: If there is an exception verifying a token.

    Examples:

        >>> payload = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoiYiJ9.jiMyrsmD8AoHWeQgmxZ5yq8z0lXS67_QGs52AzC8Ru8'
        >>> jws.verify(payload, 'secret', algorithms='HS256')

    """

    header, claims, signing_input, signature = _load(token)

    if verify:
        _verify_signature(claims, signing_input, header, signature, key, algorithms)

    return claims


def get_unverified_headers(token):
    """Returns the decoded headers without verification of any kind.

    Args:
        token (str): A signed JWS to decode the headers from.

    Returns:
        dict: The dict representation of the token headers.

    Raises:
        JWSError: If there is an exception decoding the token.
    """
    header, claims, signing_input, signature = _load(token)
    return header


def get_unverified_claims(token):
    """Returns the decoded claims without verification of any kind.

    Args:
        token (str): A signed JWS to decode the headers from.

    Returns:
        dict: The dict representation of the token claims.

    Raises:
        JWSError: If there is an exception decoding the token.
    """
    header, claims, signing_input, signature = _load(token)
    return claims


def _encode_header(algorithm, additional_headers=None):
    header = {
        "typ": "JWT",
        "alg": algorithm
    }

    if additional_headers:
        header.update(additional_headers)

    json_header = json.dumps(
        header,
        separators=(',', ':'),
    ).encode('utf-8')

    return base64url_encode(json_header)


def _encode_claims(claims):
    json_payload = json.dumps(
        claims,
        separators=(',', ':'),
    ).encode('utf-8')

    return base64url_encode(json_payload)


def _sign_header_and_claims(encoded_header, encoded_claims, algorithm, key):
    signing_input = b'.'.join([encoded_header, encoded_claims])
    try:
        alg_obj = get_algorithm_object(algorithm)
        key = alg_obj.prepare_key(key)
        signature = alg_obj.sign(signing_input, key)
    except Exception as e:
        raise JWSError(e)

    encoded_signature = base64url_encode(signature)

    encoded_string = b'.'.join([encoded_header, encoded_claims, encoded_signature])

    return encoded_string.decode('utf-8')


def _load(jwt):
    if isinstance(jwt, six.text_type):
        jwt = jwt.encode('utf-8')
    try:
        signing_input, crypto_segment = jwt.rsplit(b'.', 1)
        header_segment, claims_segment = signing_input.split(b'.', 1)
        header_data = base64url_decode(header_segment)
    except ValueError:
        raise JWSError('Not enough segments')
    except (TypeError, binascii.Error):
        raise JWSError('Invalid header padding')

    try:
        header = json.loads(header_data.decode('utf-8'))
    except ValueError as e:
        raise JWSError('Invalid header string: %s' % e)

    if not isinstance(header, Mapping):
        raise JWSError('Invalid header string: must be a json object')

    try:
        claims_data = base64url_decode(claims_segment)
        claims = json.loads(claims_data.decode('utf-8'))
    except (TypeError, binascii.Error):
        raise JWSError('Invalid payload padding')
    except ValueError as e:
        raise JWSError('Invalid payload string: %s' % e)

    if not isinstance(claims, Mapping):
        raise JWSError('Invalid payload string: must be a json object')

    try:
        signature = base64url_decode(crypto_segment)
    except (TypeError, binascii.Error):
        raise JWSError('Invalid crypto padding')

    return (header, claims, signing_input, signature)


def _verify_signature(payload, signing_input, header, signature, key='', algorithms=None):

        alg = header.get('alg')
        if not alg:
            raise JWSError('No algorithm was specified in the JWS header.')

        if algorithms is not None and alg not in algorithms:
            raise JWSError('The specified alg value is not allowed')

        try:
            alg_obj = get_algorithm_object(alg)
            key = alg_obj.prepare_key(key)

            if not alg_obj.verify(signing_input, key, signature):
                raise JWSSignatureError()

        except JWSSignatureError:
            raise JWSError('Signature verification failed.')
        except JWSError:
            raise JWSError('Invalid or unsupported algorithm: %s' % alg)