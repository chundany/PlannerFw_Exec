##
 # This file is covered by the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 # To purchase a commercial license at http://w3plan.net
 # 
 # Copyright 2015-2016 W3plan Technologies, http://w3plan.net
 #
 ##

require "uri"
require "base64"
require "zlib"
 
class Pfsecure
	##
	 # Encrypt data and return result
	 # 
	 # @param {string} $str    Plain text
	 # @param {string} $pword  password for encryption
	 # @return {string}        Cypher text
	 ##
	def pfEncryption(str, pword)
		begin
			val = URI.encode(str) 		
			xVal = pfXor(val, pword)
			bVal = Base64.encode64(xVal)
			return URI.encode(bVal)
		rescue
			puts "Decryption failed"
		end
	end
	
	##
	 # Decrypted data and return result
	 # 
	 # @param {string}  $str    XOR encrypted data
	 # @param {string}  $pword  password for decryption
	 # @return {string} plain text      
	 ##
	def pfDecryption(str, pword)
		begin
			val = URI.decode(str)
			xVal = Base64.decode64(val)
			bVal = pfXor(xVal, pword)
			return URI.decode(bVal)
		rescue
		  puts "Decryption failed"
		end
	end

	 ##
	 # Encryption and decryption ASCII string with XOR cipher and an optional password for Ruby
	 # 
	 # @public
	 # @param {string} instr   	 ASCII string to be encrypted/decrypted
	 # @param {string=} pword  	 Optional XOR password with 8 characters at least, 
	 #							 default length of password is 256
	 # @return {string}			 Encrypted/decrypted string, return an empty string if instr is empty
	 #
	 ##
	def pfXor(instr, pword)
		if (instr.strip.length < 1)
			return ""
		end	
		if (pword.length < 8) 
			pword = "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ"
		end	
		keys = pword.split(//)	
		output = ""
		i = 0
		while c = instr.getc
			pass_char = keys[i]		
			xor = c.chr[0] ^ pass_char[0]		
			output += xor.chr		
			i+=1		
			if i == (keys.size - 1)		
				i = 0		
			end		
		end	
		return output	
	end
	
	##
	 # Check data weather matching gave CRC32 checksum
	 # 
	 # @public 
	 # @param {string} val   Original data
	 # @param {string} csm   decimal string of CRC32 checksum 
	 # @return {boolean}     True if data matches checksum otherwise false
	 ## 
	def pfCheckCrc(val, csm)
		if crc32CheckSum(val) == csm:
			return true
		else
			return false
		end
	end
	
	##
	 # Calculates a string's CRC32 checksum to check data integrity to see
	 # weather the data has been modified or changed 
	 #
	 # @public
	 # @param {string} str   A string in Latin1 (ISO8859-1) character set
	 # @return {string}	     A decimal string
	 ##
	def crc32CheckSum(str)
		return Zlib::crc32(str)
	end
end
