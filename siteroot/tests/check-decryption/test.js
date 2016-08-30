// Test module
module("Plannerfw JSON schema", {
setup: function() {	
	// Check data
	this.with_checksum1	   = {"member60__pfcrc": ["PlannerFw Community Version - Planificateur communautaire Version", "2124371012"]};
	this.without_checksum1 = {"member60": "PlannerFw Community Version - Planificateur communautaire Version"};
	
	this.with_checksum2	   = {"member62__pfcrc": ["The quick brown fox jumped over the lazy dog - 敏捷的棕色狐狸跳过了懒狗", "1520042642"]};
	this.without_checksum2 = {"member62": "The quick brown fox jumped over the lazy dog - 敏捷的棕色狐狸跳过了懒狗"};
	
	this.with_checksum3	   = {"member64__pfcrc": ["/images/pfm/karina_storm1.jpg", "1856105291"]};
	this.without_checksum3 = {"member64": "/images/pfm/karina_storm1.jpg"};
	
	this.with_checksum4	   = {"member66__pfcrc": ["/images/pfm/karina_storm2.jpg", "687968667"]};
	this.without_checksum4 = {"member66": "/images/pfm/karina_storm2.jpg"};
	
	this.with_checksum5	   = {"member68__pfcrc": ["float: left; width: 100%; background: #333;", "2064493575"]};
	this.without_checksum5 = {"member68": "float: left; width: 100%; background: #333;"};
	
	
	// Decrypt data
	this.with_encryption1	= {"member80__pfenc": "aB1TKzYWKwQ0YWhTCFwFDB8oLxoAX1Z3BDEQHRs2DE9reldOUH0WCjMkLwIfCzESJxgCa2RHUTYGLy8aLEwfLT5EKHdzQyJSJBFaFgY="};
	this.without_encryption1 = {"member80": "PlannerFw Community Version - Planificateur communautaire Version"};
	
	this.with_encryption2	   = {"member82__pfenc": "bBlXYGpDKDcqJzFGeQMKEwUxKEtLSgIoKnFQXhgsDxo8Ll9ZUiIwAyBvdFQCADVDcF0cLywOF2tbJjUTaAtbYXIEfXcERVEOY0cLP019fX9PNRcmY2swYUFIeURbfHwgV1MDUnVDBmgVS2d/SWQSAV8kdGFOGHBtRmsCVnJOMms1SVIraRwGD0sYC3FxcxwGfm1qTnR3bHEjMUR5U2EWY0NZWVNScU4XcV9QdlNqRA=="};
	this.without_encryption2 = {"member82": "The quick brown fox jumped over the lazy dog - 敏捷的棕色狐狸跳过了懒狗"};
	
	this.with_encryption3	= {"member84__pfenc": "djBhBH1BbjFmdmo3LkEaAE90dh0YDgErPj0WC1drUho4OQkOBmh0Vj08IxZTWmAtIx8ZIDdSAGkCLH9GfU0DKXIEfTcgAABSJAwWS1hoKjkeF1sHcXxFc1cyWhNGexxAU0YNAjUbXWhiQy0pVXNgcg8GbWFEamRgU3x3ACNTQn5FVEQvZQlhCl4qVXoReQkBfBx3S2FFMDEPVVNxDDB2Z1YWDwVOcVshMhMEWFNhQ1JmC0EqIgomHhtYPjA="};
	this.without_encryption3 = {"member84": "NASA's Terra satellite passed over Karina in the eastern Pacific <br> Ocean on Aug. 14 at 2:40 pm. EDT when it was still a hurricane"};
	
	this.with_encryption4	= {"member86__pfenc": "HTQFYBo2fHoGYR9WbgoqRCgCYytMXyUCd2xVSzdhR1JhbzsqRwhzQxB7Y1xGPDUUMAxVC2NSCh1OAxhRCA9OdW8TdBRkNkESbyEWOFAAbh9BVAsncXZNZ1BUfVdGcW5AIENnJGRfcXV1SwBiNXR1Cz5Ee3xEf2YVQn5iUhQUAmtENFIrZhwGfUtifXFxfhx9em0QPXR3bHEjSER4JmEWbENZXVMqe04XcF9RA1MRRRYGAFR7YF0WQ118aHAWYld5IGlwaEMlMHRqYEQGQWZ5HksmAnV9ZBxYdXwHYHFyDFJzalxMdnM2AkBNQW44Al0heB0KclB7XRc8fn93BRd0ch00BGBhS3wDBWEfV25xUERSdmMrTV8mf3cVI0s3YEcram9DWEcIf0MTeWNcMw=="};
	this.without_encryption4 = {"member86": "美国宇航局Terra卫星在8月14日下午2:40<br>美国东部时间越过卡琳娜时它还是一个飓风"};
	
	this.with_encryption8	= {"member87__pfenc": "HURwYGpBPislYR9VbnJYRCgFYytMXyYEd2wkS0BrR1gab0hbR390DCItYyFATRFWZy8zaxNCFxsoZ2IyaAtZaWV1aGBxVkYFPBJWHk19fX82QRcmF2swY0Eze0RbDnxXU1NwInVIA2hiQTIpF2QVBV8gc2E0GXARQ2sFInJONmtFQ1JcEhx2CEtoCiBdLRwBDm0TSXRwG3EkRUQDJmFrE0NTXFNeBw=="};
	this.without_encryption8 = {"member87": ["gif格式", "jpg格式", "jpeg格式", "png格式", "tif格式"]};
	
	this.with_encryption5	= {"member88__pfenc": "XgRcJiwaNixmdmoQP1IaFT4vKwtcSFxiYG1HXEJ8VSh8eEodAz9jVGI+KQAXEXVVBgMVOXNFAh0KNj9RfwFOfm4TfhBkQURBNxAWS1hQbmkzBV0ANTdbMQEFcA4WOipAU05nU2lfAA91QXIxETN1AUoMZncyLjowFzdpBjICPScZBAMLIhx2AEtoAXEHCRx2CD4zC3QAaCdEQyU1CiAyLEgGCwI4Jgg9KB4bEURrVgF6HEIAckpkHh4cYmVxZkosRH4FdVUkU2NiZlFmRnpkaF4KFmIIdgolYGt1dmYACVIAZVxHBXNBdkBGRiZfBzpBfwgiUVBxXhdLfikQcQJoeXtUAHVpQ3xwemFoUzgWWlFPdQJLS0pBdWVkR1xFfFBafHg4TlB9NUNhCGNWRgw/BTcAFSAiWVU8Hwc2ESBcBTgVTwQ2ZEFMEmRVUBUHWyAuDwUXVmNrR29KGFYPBjoRMSw6Z1NgXwAJdUFyL1VzYBZII2Z2Rn9nY1N9BkRlQVV8R1RFLHQLdFVLaAhxBgkcdghtYE50ARlxU0dEc1VhYRdDU14FTnApd3RKHlUEdkEDNxxDcnJLEFJKCSMwIAAbLAQjQCRDVU43JzkCNx0sL39cXxZiAXYOIzYtJCEgY1AaV3dLTRBkShFSMFN5ORFKVHgIexJHeksBO2NtcQ=="};
	this.without_encryption5 = {"member88": "function startTime() { var today=new Date(); var h=today.getHours(); var m=today.getMinutes(); var s=today.getSeconds(); if (m < 10) m = '0' + m; if (s < 10) s = '0' + s; document.getElementById('clocktxt').innerHTML = h + ':' + m + ':' + s; var t = setTimeout(function(){startTime()}, 500);}"};
	
	this.with_encryption6	= {"member89__pfenc": "HUZwYGpBOis3PX9ReRZbIE90dktLSEECZHEgWldgIE8cfF9SJmh+X3cPcUFPLnUkdEhCfHNFcXxZcDQVIFxOfmUTfhNkQUQSZFB5GAVdOH9FQXQWNSAWOUFDCkRRC3xXUxclBHVIAWhjMmd1QHNoFkgiZnZEPzEhFS8zCDgYVXxFVEQvdAt0HVxoHREBbnhwHQllXBQHfRUlVSB3QHZhcFEl"};
	this.without_encryption6 = {"member89": {	"city": "洛杉矶",
												"name": "James Franco",
												"age": 28,
												"education": "大学"
											}};
	
}});

// Test cases
QUnit.test("Check JSON member with CRC32 checksum", function(assert){	
	
	formatedJSON = this.with_checksum1;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_checksum1), "Match CRC32 checksum and strip notation");
	
	formatedJSON = this.with_checksum2;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_checksum2), "Match CRC32 checksum and strip notation");
	
	formatedJSON = this.with_checksum3;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_checksum3), "Match CRC32 checksum and strip notation");
	
	formatedJSON = this.with_checksum4;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_checksum4), "Match CRC32 checksum and strip notation");
	
	formatedJSON = this.with_checksum5;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_checksum5), "Match CRC32 checksum and strip notation");
	
	
	formatedJSON = this.with_encryption1;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_encryption1), "Decrypt data and strip notation");
	
	formatedJSON = this.with_encryption2;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_encryption2), "Decrypt data and strip notation");
	
	formatedJSON = this.with_encryption3;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_encryption3), "Decrypt data and strip notation");
	
	formatedJSON = this.with_encryption4;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_encryption4), "Decrypt data and strip notation");
	
	formatedJSON = this.with_encryption8;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_encryption8), "Decrypt data and strip notation");
	
	formatedJSON = this.with_encryption5;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_encryption5), "Decrypt data and strip notation");
	
	formatedJSON = this.with_encryption6;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.without_encryption6), "Decrypt data and strip notation");
	
});
