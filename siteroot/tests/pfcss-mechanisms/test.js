// Test module
module("PFCSS Mechanisms of Plannerfw", {
setup: function() {
	/* Variable mechanism */
	// actual
	this.dcss10 =  function (pfDataSet /* Template-related JSON data */, planner /* Core library object */) {
		var _pf19edb768 = '';
		_pf19edb768 += '';
		var clr = "#4D926F";
		var bg = "background-color";
		var h2 = "h2";
		_pf19edb768 += ' #header { color: ';
		_pf19edb768 += clr;
		_pf19edb768 += '; } ';
		_pf19edb768 += h2;
		_pf19edb768 += ' { ';
		_pf19edb768 += bg;
		_pf19edb768 += ': white; }';
		return _pf19edb768;
	};
	// expected
	this.scss10 =  '#header {\
					  color: #4D926F;\
					}\
					h2 {\
					  background-color: white;\
					}';	
	
	/* Mixins mechanism */
	// actual
	this.dcss20 =  function (pfDataSet /* Template-related JSON data */, planner /* Core library object */) {
			var _pf19edb768 = '';
			_pf19edb768 += '';
			function mixin(radius) {
				radius = radius || "5px";
				return "-webkit-border-radius: " + radius + "; " + "-moz-border-radius: " + radius + "; " + "border-radius: "+ radius + "; ";
			}
			_pf19edb768 += ' #header { ';
			_pf19edb768 += mixin();
			_pf19edb768 += ' } ';
			/* Mixins with Arguments / Dynamic Mixins */;
			_pf19edb768 += ' #footer { ';
			_pf19edb768 += mixin("10px");
			_pf19edb768 += ' }';
			return _pf19edb768;
		};
	// expected
	this.scss20 =  '#header {\
					  -webkit-border-radius: 5px;\
					  -moz-border-radius: 5px;\
					  border-radius: 5px;\
					}\
					#footer {\
					  -webkit-border-radius: 10px;\
					  -moz-border-radius: 10px;\
					  border-radius: 10px;\
					}';

	/* Nesting mechanism */
	// actual
	this.dcss30 = function (pfDataSet /* Template-related JSON data */, planner /* Core library object */) {
			var _pf19edb768 = '';
			_pf19edb768 += '';
			var nest = " #header { h1 {font-size: 26px; font-weight: bold;} p {font-size: 12px; a {text-decoration: none;} a:hover { border-width: 1px; }} background-color: #ccc;}";
			/* Write parsed result to output stream */;
			_pf19edb768 += planner.parseNestedCss(nest);
			_pf19edb768 += '';
			return _pf19edb768;
		};
	// expected
	this.scss30 =  '#header {\
					  background-color: #ccc;\
					}\
					#header h1 {\
					  font-size: 26px;\
					  font-weight: bold;\
					}\
					#header p {\
					  font-size: 12px;\
					}\
					#header p a {\
					  text-decoration: none;\
					}\
					#header p a:hover {\
					  border-width: 1px;\
					}';
	
	/* Functions mechanism */
	// actual
	this.dcss40 = function pfTemp(pfDataSet /* Template-related JSON data */, planner /* Core library object */) {
			var _pf19edb768 = '';
			_pf19edb768 += '';
			/* Arithmetic rules of CSS units calculation: 2em * 3in => Error 2em + 3em => 5em 2em + 3 => 5em 2in * 3in => 6in 2in * 3 => 6in (3cm / 2em) * 4em => Error 2in + 3cm + 2pc => Error 3in / 2in => 1.5in 3in / 2 => 1.5in */ 
			var fontSize = "50%";
			var lineHeight = "10px";
			_pf19edb768 += ' .content h3 { color: #000; font-size: ';
			_pf19edb768 += planner.addCssUnit(planner.stripCssUnit(fontSize) * 2 + 60 , "%");
			_pf19edb768 += '; margin: ';
			_pf19edb768 += planner.addCssUnit(planner.stripCssUnit(lineHeight) * 4);
			_pf19edb768 += ' 0; }';
			return _pf19edb768;
	};
	// expected
	this.scss40 =  '\
					.content h3 {\
						color: #000;\
						font-size: 160%; \
						margin: 40px 0; \
					}';
	
	/* Operations mechanism */
	// actual
	this.dcss50 = function pfTemp(pfDataSet /* Template-related JSON data */, planner /* Core library object */) {
			var _pf19edb768 = '';
			_pf19edb768 += '';
			/* Looping operation */ 
			for (var i = 1; i < 6; i++) {
				_pf19edb768 += ".border-#" + i + "0 {" + " border: " + i + "px solid blue;" + "}";
			}
			_pf19edb768 += ' ';
			return _pf19edb768;
		};
	// expected
	this.scss50 = '\
					.border-#10 { \
						border: 1px solid blue; \
					} \
					.border-#20 { \
						border: 2px solid blue; \
					} \
					.border-#30 { \
						border: 3px solid blue; \
					} \
					.border-#40 { \
						border: 4px solid blue; \
					} \
					.border-#50 { \
						border: 5px solid blue; \
					} \
				  ';
}});

// Test cases
QUnit.test("Test PFCSS mechanisms", function(assert){
	var dcssData = this.dcss10;
	var resultCode = dcssData({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss10), "PFCSS variable mechanism");
	
	dcssData = this.dcss20;
	resultCode = dcssData({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss20), "PFCSS mixins mechanism");
	
	dcssData = this.dcss30;
	resultCode = dcssData({}, planner);
	resultCode = resultCode.replace(/;}#/g, "; } #").replace(/;}/g, "; }");
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss30), "PFCSS nesting mechanism");
	
	dcssData = this.dcss40;
	resultCode = dcssData({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss40), "PFCSS functions mechanism");
	
	dcssData = this.dcss50;
	resultCode = dcssData({}, planner);
	resultCode = resultCode.replace(/;}\./g, "; } .").replace(/;}/g, "; }");
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss50), "PFCSS operations mechanism");
});
