function execProgram()
{
	var program = document.getElementById("program").value;
	//console.log(program);
	//console.log(typeof(program));
	var pArray = programToArray(program);
	var i,j;
	for(i=0;i<pArray.length;i++)
	{
		console.log(pArray[i]);
		if(pArray[i] == "")
			break;
	}
	var proc = new Processor(pArray);

}

function programToArray(program)
{
	var i;
	var j = 0;
	var parsedProgram = new Array(100);

	parsedProgram = program.split('\n');
	return parsedProgram;
}
