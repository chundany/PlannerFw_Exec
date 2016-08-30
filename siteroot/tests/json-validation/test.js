// Test module
module("Plannerfw JSON schema", {
setup: function() {
	// string types
	this.type_str 	    = 	{"member1__pfvld": ["NASA's Terra satellite passed over Karina in the eastern Pacific", {"type": "str"}]};
	this.type_no_str    = 	{"member1": "NASA's Terra satellite passed over Karina in the eastern Pacific"};
	this.type_numstr    = 	{"member2__pfvld": ["123.456789", {"type": "numstr", "constraint" : {"minLen": 8, "maxLen": 12}}]};
	this.type_no_numstr =   {"member2": "123.456789"};
	this.type_tokstr    = 	{"member50__pfvld": ["5385566611108568", {"type": "tokstr", "constraint": {"pattern": /^5[1-5][0-9]{14}$/g}}]};
	this.type_no_tokstr = 	{"member50": "5385566611108568"};
	this.type_expstr 	= 	{"member3__pfvld": ["5.827e+3", {"type": "expstr"}]};
	this.type_no_expstr = 	{"member3": "5.827e+3"};
	this.type_hexstr 	= 	{"member51__pfvld": ["0x60a2fb", {"type": "hexstr"}]};
	this.type_no_hexstr = 	{"member51": "0x60a2fb"};
	this.type_octstr 	= 	{"member52__pfvld": ["03571040", {"type": "octstr"}]};
	this.type_no_octstr = 	{"member52": "03571040"};
	this.type_binstr 	= 	{"member53__pfvld": ["11000010100", {"type": "binstr"}]};
	this.type_no_binstr = 	{"member53": "11000010100"};
	this.type_datstr 	= 	{"member4__pfvld": ["October 13, 2014 11:13:00", {"type": "datstr"}]};
	this.type_no_datstr = 	{"member4": "October 13, 2014 11:13:00"};
	this.type_jsnstr 	= 	{"member5__pfvld": ['{"a":[5,3,1],"b":"test"}', {"type": "jsnstr"}]};
	this.type_no_jsnstr = 	{"member5": '{"a":[5,3,1],"b":"test"}'};
	this.type_b64str 	= 	{"member6__pfvld": ["UGxhbm5lciBmcmFtZXdvcms=", {"type": "b64str"}]};
	this.type_no_b64str = 	{"member6": "UGxhbm5lciBmcmFtZXdvcms="};
	this.type_ascstr 	= 	{"member7__pfvld": ["Karina in the eastern Pacific", {"type": "ascstr"}]};
	this.type_no_ascstr = 	{"member7": "Karina in the eastern Pacific"};	
	this.type_unistr 	= 	{"member8__pfvld": ["Karina在8月14日越过卡琳娜时它还是一个飓风", {"type": "unistr"}]};
	this.type_no_unistr = 	{"member8": "Karina在8月14日越过卡琳娜时它还是一个飓风"};
	this.type_emlstr	= 	{"member9__pfvld": ["plannerfw@gmail.com", {"type": "emlstr"}]};
	this.type_no_emlstr = 	{"member9": "plannerfw@gmail.com"};	
	this.type_urlstr 	= 	{"member10__pfvld": ["http://en.wikipedia.org/wiki/JSON", {"type": "urlstr"}]};
	this.type_no_urlstr = 	{"member10": "http://en.wikipedia.org/wiki/JSON"};
	this.type_clrstr 	= 	{"member11__pfvld": ["#ccc", {"type": "clrstr"}]};			// or "#cccccc"
	this.type_no_clrstr = 	{"member11": "#ccc"};	
	this.type_lenstr 	= 	{"member12__pfvld": ["30px", {"type": "lenstr"}]};			// or "25pt"
	this.type_no_lenstr = 	{"member12": "30px"};
	this.type_angstr 	= 	{"member13__pfvld": ["45deg", {"type": "angstr"}]};			// or "400grad"
	this.type_no_angstr = 	{"member13": "45deg"};
	this.type_regstr 	= 	{"member26__pfvld": ["/^[a-z0-9_-]{6,18}$/gi", {"type": "regstr"}]};
	this.type_no_regstr = 	{"member26": "/^[a-z0-9_-]{6,18}$/gi"};
	this.type_str_enumeration = {"member30__pfvld": ["Sunny", {"type": "str", "constraint": {"enums":["Rainy", "Sunny", "Cloudy", "Windy"]}}]};
	this.type_no_str_enumeration = 	{"member30": "Sunny"};
	
	
	// number types
	this.type_num	    = 	{"member14__pfvld": [123.456, {"type": "num"}]};
	this.type_no_num    = 	{"member14": 123.456};
	this.type_posnum    = 	{"member31__pfvld": [53586754, {"type": "num", "constraint": {"totalDigi": 8}}]};
	this.type_no_posnum = 	{"member31": 53586754};
	this.type_fltnum_fractDigi    = {"member32__pfvld": [3.1415926535, {"type": "fltnum", "constraint": {"fractDigi": 10}}]};
	this.type_no_fltnum_fractDigi = {"member32": 3.1415926535};
	this.type_fltnum_inc    = {"member33__pfvld": [3.1415, {"type": "fltnum", "constraint": {"minInc": 3.14, "maxInc": 3.1415}}]};
	this.type_no_fltnum_inc = {"member33": 3.1415};
	this.type_fltnum_exc    = {"member34__pfvld": [3.1415, {"type": "fltnum", "constraint": {"minExc": 3.14, "maxExc": 3.14151}}]};
	this.type_no_fltnum_exc = {"member34": 3.1415};
	this.type_intnum 	= 	{"member15__pfvld": [16, {"type": "intnum"}]};
	this.type_no_intnum = 	{"member15": 16};
	this.type_fltnum 	= 	{"member16__pfvld": [3.1415, {"type": "fltnum"}]};
	this.type_no_fltnum = 	{"member16": 3.1415};
	
	
	// boolean types
	this.type_bln 	    = 	{"member17__pfvld": [true, {"type": "bln"}]};
	this.type_no_bln    = 	{"member17": true};
	this.type_trubln 	= 	{"member18__pfvld": [true, {"type": "trubln"}]};
	this.type_no_trubln = 	{"member18": true};
	this.type_flsbln 	= 	{"member19__pfvld": [false, {"type": "flsbln"}]};
	this.type_no_flsbln = 	{"member19": false};
	
	
	// null type
	this.type_nul	    = 	{"member20__pfvld": [null, {"type": "nul"}]};
	this.type_no_nul    = 	{"member20": null};
	
	
	// Check data
	this.with_checksum1	   = {"member60__pfcrc": ["PlannerFw Community Version", "4053099640"]};
	this.without_checksum1 = {"member60": "PlannerFw Community Version"};
	
}});

// Test cases
QUnit.test("Validate JSON type formats", function(assert){	
	var formatedJSON = this.type_str;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_str), "Validate string and strip notation");
	
	formatedJSON = this.type_numstr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_numstr), "Validate number string with minLength and maxLength constraints and strip notation");
	
	formatedJSON = this.type_tokstr;
	planner.secureModel(formatedJSON);	
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_tokstr), "Validate MasterCard string with pattern constraint and strip notation");
	
	formatedJSON = this.type_expstr;
	planner.secureModel(formatedJSON);	
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_expstr), "Validate exponential number string type and strip notation");
	
	formatedJSON = this.type_hexstr;
	planner.secureModel(formatedJSON);	
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_hexstr), "Validate hexadecimal number string and strip notation");
	
	formatedJSON = this.type_octstr;
	planner.secureModel(formatedJSON);	
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_octstr), "Validate octal number string and strip notation");
	
	formatedJSON = this.type_binstr;
	planner.secureModel(formatedJSON);	
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_binstr), "Validate binary number string and strip notation");
	
	formatedJSON = this.type_datstr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_datstr), "Validate date string type and strip date notation");
	
	formatedJSON = this.type_jsnstr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_jsnstr), "Validate JSON string and strip notation");
	
	formatedJSON = this.type_b64str;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_b64str), "Validate base64 encoded string and strip notation");
	
	formatedJSON = this.type_ascstr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_ascstr), "Validate ASCII string and strip notation");
	
	formatedJSON = this.type_unistr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_unistr), "Validate Unicode string and strip notation");
	
	formatedJSON = this.type_emlstr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_emlstr), "Validate email string and strip notation");
	
	formatedJSON = this.type_urlstr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_urlstr), "Validate URL string and strip notation");
	
	formatedJSON = this.type_clrstr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_clrstr), "Validate CSS color string and strip notation");
	
	formatedJSON = this.type_lenstr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_lenstr), "Validate CSS length string and strip notation");
	
	formatedJSON = this.type_angstr;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_angstr), "Validate CSS angle string and strip notation");
	
	formatedJSON = this.type_str_enumeration;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_str_enumeration), "Validate string with enumeration constraint and strip notation");
	
	formatedJSON = this.type_num;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_num), "Validate number type and strip notation");
	
	formatedJSON = this.type_posnum;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_posnum), "Validate positive integer with totalDigits constraint and strip notation");
	
	formatedJSON = this.type_fltnum_fractDigi;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_fltnum_fractDigi), "Validate float with fractionDigits constraint and strip notation");
	
	formatedJSON = this.type_fltnum_inc;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_fltnum_inc), "Validate float with minInc and maxInc constraints and strip notation");
	
	formatedJSON = this.type_fltnum_exc;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_fltnum_exc), "Validate float with minExc and maxExc constraints and strip notation");
	
	formatedJSON = this.type_intnum;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_intnum), "Validate integer and strip notation");
	
	formatedJSON = this.type_fltnum;
	planner.secureModel(formatedJSON);	
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_fltnum), "Validate float and strip notation");
	
	formatedJSON = this.type_bln;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_bln), "Validate boolean type and strip notation");
	
	formatedJSON = this.type_tru;
	planner.secureModel(formatedJSON);	
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_tru), "Validate true type and strip true notation");
	
	formatedJSON = this.type_flsbln;
	planner.secureModel(formatedJSON);		
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_flsbln), "Validate false type and strip notation");
	
	formatedJSON = this.type_nul;
	planner.secureModel(formatedJSON);
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_nul), "Validate null type and strip notation");
	
	formatedJSON = this.type_regstr;
	planner.secureModel(formatedJSON);	
	assert.strictEqual(JSON.stringify(formatedJSON), JSON.stringify(this.type_no_regstr), "Validate regExp string and strip notation");
});
