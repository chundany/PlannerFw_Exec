##
 # This file is covered by the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 # To purchase a commercial license at http://w3plan.net
 # 
 # Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 #
 ##
 
use strict;
use warnings;

use MIME::Base64;
use Try::Tiny;
use String::CRC32;

##
 # Encrypt data and return result
 # 
 # @param {string} $str    Plain text
 # @param {string} $pword  password for encryption
 # @return {string}        Cypher text
 ##
function pfEncryption($str, $pword = "") {
	try {
		$val = urlencode($str);				
		$val = pfXor($val, $pword);
		$val = encode_base64($val);
		return urlencode($val);
	
	} catch {
		warn "Encryption failed, $_";
	}
}

##
 # Decrypted data and return result
 # 
 # @param {string}  $str    XOR encrypted data
 # @param {string}  $pword  password for decryption
 # @return {string} plain text      
 ##
sub pfDecryption {
	my ($str, $pword) = @_;
	$pword ||= "";
	
	try {
		$val = urldecode($str);
		$val = decode_base64($val);
		$val = pfXor($val, $pword);
		return urldecode($val);
	
	} catch {
		warn "Decryption failed, $_";
	}
}

##
#  Encrypt ASCII string and decrypt result string with XOR cipher and an optional password for Perl
#  
#  @public 
#  @param {string} instr    ASCII string to be encrypted and string to be decrypted
#  @param {string=} pword  	Optional XOR password with 8 characters at least, 
# 							default length of password is 256
#  @return {string} 		Encrypted/decrypted string, return an empty string if instr is empty
# 
##

sub pfXor {
	my ($instr, $pword) = @_;	
	if (not($instr and trim($instr))) {
		return false;
	}
	
	$pword ||= "";	
	if (length($pword) < 8) {
		$pword = "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ";
	}
	
	my $icnt = length($instr);
	@keys = split(//, "$pword");
	my $kcnt = @keys;
	my $output = "";
	for (my $i = 0; $i < $icnt; $i++) {
		my $index = $i % $kcnt;
		$output .= substr($instr, $i, 1) ^ @keys[$index];
	}	
	return $output;
}

##
 # Check data weather matching gave CRC32 checksum
 # 
 # @public 
 # @param {string} $val   Original data
 # @param {string} $csm   decimal string of CRC32 checksum 
 # @return {boolean}      True if data matches checksum otherwise false
 ## 
sub pfCheckCrc($val, $csm) {
	if (crc32CheckSum($val) == $csm) {
		return true;
	} else {
		return false;
	}
}

##
 # Calculates a string's CRC32 checksum to check data integrity to see
 # weather the data has been modified or changed 
 #
 # @public
 # @param {string} $str   A string in Latin1 (ISO8859-1) character set
 # @return {string}	      A decimal string
 ##
sub crc32CheckSum($str) {
	return crc32($str);
}

##
 # Url encoding
 # 
 ##
sub urlencode {
    my $s = shift;
    $s =~ s/ /+/g;
    $s =~ s/([^A-Za-z0-9\+-])/sprintf("%%%02X", ord($1))/seg;
    return $s;
}

##
 # Url decoding
 # 
 ##
sub urldecode {
    my $s = shift;
    $s =~ s/\%([A-Fa-f0-9]{2})/pack('C', hex($1))/seg;
    $s =~ s/\+/ /g;
    return $s;
}

##
 # Trim string
 # 
 ##
sub  trim {
	my $s = shift; 
	$s =~ s/^\s+|\s+$//g; 
	return $s 
};
