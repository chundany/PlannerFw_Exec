// Define data global variable 
var pfDataSet = null;

// Test module
module("Template compilation and transformation of Plannerfw Exec", {
setup: function() {
	/* Actual, Code = Template + Data */
	/* PlannerFw template */
	this.pfTemp = function(pfDataSet /* Template-related JSON data */, planner /* Core library object */) {
		var _pf19edb768 = '';
		_pf19edb768 += '';
		/* A typical template of Plannerfw */;
		_pf19edb768 += ' <table border="1" cellpadding="1" cellspacing="1" width="60%"> <caption class="dcap"><strong>User data grid</strong></caption> <tr> <th rowspan="2">City</th> <th colspan="3">Users</th> </tr> <tr> <th>Name</th> <th>Age</th> <th>Education</th> </tr> ';
		for(var key in pfDataSet.grid) {
			if (pfDataSet.grid.hasOwnProperty(key)) {
				_pf19edb768 += ' <tr> <td>';
				_pf19edb768 += pfDataSet.grid[key].city;
				_pf19edb768 += '</td> <td>';
				_pf19edb768 += pfDataSet.grid[key].name;
				_pf19edb768 += '</td> <td>';
				_pf19edb768 += pfDataSet.grid[key].age;
				_pf19edb768 += '</td> <td> <select name="Education" style="cursor:pointer"> ';
				var educations = ["No College", "Some College", "Graduate School", "College"];
				/* Plannerfw is able to use almost all JavaScript code */ 
				for (var i = 0, len = educations.length; i < len; i++) {
				/* Tag nested sample of Plannerfw */ 
				if (pfDataSet.grid[key].education.toLowerCase() == educations[i].toLowerCase()) {
					_pf19edb768 += "<option value=" + String.fromCharCode(34) + educations[i] + String.fromCharCode(34) + " selected>" + educations[i] + "</option>";
				}
				else {
					_pf19edb768 += "<option value=" + String.fromCharCode(34) + educations[i] + String.fromCharCode(34) + ">" + educations[i] + "</option>";
				}
			  }
				_pf19edb768 += ' </select> </td> </tr> ';
			}
		}
		_pf19edb768 += ' </table> ';
		return _pf19edb768;
	};
	
	// Assign dynamic data JSON to variable pfDataSet
	this.pfDataSet = {
				"grid": {
						"gridRow1": {
							"city": "New York",
							"name": "Jonesy Band",
							"age": 16,
							"education": "No College"
						},
						"gridRow2": {
							"city": "Chicago",
							"name": "Mary Kay",
							"age": 35,
							"education": "Graduate School"
						},
						"gridRow3": {
							"city": "Los Angeles",
							"name": "James Franco",
							"age": 28,
							"education": "College"
						},
						"gridRow4": {
							"city": "San Diego",
							"name": "Ellen Compell",
							"age": 20,
							"education": "Some College"
						}
					}
			};
	
	/* Expected */
	this.results = '\
			<table border="1" cellpadding="1" cellspacing="1" width="60%"> \
				<caption class="dcap"><strong>User data grid</strong> \
				</caption> \
				<tr> \
					<th rowspan="2">City</th> \
					<th colspan="3">Users</th> \
				</tr> \
				<tr> \
					<th>Name</th> \
					<th>Age</th> \
					<th>Education</th> \
				</tr> \
				<tr> \
					<td>New York</td> \
					<td>Jonesy Band</td> \
					<td>16</td> \
					<td> \
						<select name="Education" style="cursor:pointer"> \
							<option value="No College" selected>No College</option> \
							<option value="Some College">Some College</option> \
							<option value="Graduate School">Graduate School</option> \
							<option value="College">College</option> \
						</select> \
					</td> \
				</tr> \
				<tr> \
					<td>Chicago</td> \
					<td>Mary Kay</td> \
					<td>35</td> \
					<td> \
						<select name="Education" style="cursor:pointer"> \
							<option value="No College">No College</option> \
							<option value="Some College">Some College</option> \
							<option value="Graduate School" selected>Graduate School</option> \
							<option value="College">College</option> \
						</select> \
					</td> \
				</tr> \
				<tr> \
					<td>Los Angeles</td> \
					<td>James Franco</td> \
					<td>28</td> \
					<td> \
						<select name="Education" style="cursor:pointer"> \
							<option value="No College">No College</option> \
							<option value="Some College">Some College</option> \
							<option value="Graduate School">Graduate School</option> \
							<option value="College" selected>College</option> \
						</select> \
					</td> \
				</tr> \
				<tr> \
					<td>San Diego</td> \
					<td>Ellen Compell</td> \
					<td>20</td> \
					<td> \
						<select name="Education" style="cursor:pointer"> \
							<option value="No College">No College</option> \
							<option value="Some College" selected>Some College</option> \
							<option value="Graduate School">Graduate School</option> \
							<option value="College">College</option> \
						</select> \
					</td> \
				</tr> \
			</table>';
}});

// Test cases
QUnit.test("Compile and transform templates", function(assert){
	// Applying global variable pfDataSet to template	
	var actualResult = this.pfTemp(this.pfDataSet, planner);
	
	actualResult = planner.minimizeCode(actualResult);
	
	var expectedResult = planner.minimizeCode(this.results);
	
	assert.strictEqual(actualResult, expectedResult, "Dynamic code generation");	
});
