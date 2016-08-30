##
 # This file is covered by the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 # To purchase a commercial license at http://w3plan.net
 # 
 # Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 #
 ##

import urllib
import base64
import binascii

##
 # Encrypt data and return result
 # 
 # @param {string} str    Plain text
 # @param {string} pword  password for encryption
 # @return {string}       Cypher text
 ##
def pfEncryption(str, pword = ""): 
	try: 
		val = urllib.quote(str)	
		val = pfXor(val, pword)
		val = base64.encodestring(val)
		return urllib.quote(val)
	
	except Exception, e: print("Encryption failed, ", e)

##
 # Decrypted data and return result
 # 
 # @param {string} str     XOR encrypted data
 # @param {string} pword   password for decryption
 # @return {string}        plain text      
 ##

def pfDecryption(str, pword = ""):
	try: 
		val = urllib.unquote(str)
		val = base64.decodestring(val)
		val = pfXor(val, pword)
		return urllib.unquote(val)
	
	except Exception, e: print("Decryption failed, ", e)

##
#  Encrypt ASCII string and decrypt result string with XOR cipher and an optional password for Python
#  
#  @public 
#  @param {string} instr    ASCII string to be encrypted and string to be decrypted
#  @param {string=} pword  	Optional XOR password with 8 characters at least, 
# 							default length of password is 256
#  @return {string} 		Encrypted/decrypted string, return an empty string if instr is empty
#
##
def pfXor(instr, pword = ""):
	if not (instr and instr.strip()):
		return ""
	
	if len(pword) < 8:
		pword = "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ"
	
	icnt = len(instr)
	keys = list(pword)	
	kcnt = len(keys)
	
	output = ""	
	for i in range(icnt):
		charCode = ord(instr[i]) ^ ord(keys[i % kcnt])
		output += chr(charCode)
	
	return output

##
 # Check data weather matching gave CRC32 checksum
 # 
 # @public 
 # @param {string} val   Original data
 # @param {string} csm   decimal string of CRC32 checksum 
 # @return {boolean}     True if data matches checksum otherwise false
 ## 
def pfCheckCrc(val, csm):
	if crc32CheckSum(val) == csm:
		return true
	else:
		return false

##
 # Calculates a string's CRC32 checksum to check data integrity to see
 # weather the data has been modified or changed 
 #
 # @public
 # @param {string} str   A string in Latin1 (ISO8859-1) character set
 # @return {string}	     A decimal string
 ##
def crc32CheckSum(str):
	return binascii.crc32(str) % (1<<32)
