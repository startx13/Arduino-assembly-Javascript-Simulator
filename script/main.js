function execProgram()
{
	var program = document.getElementById("program").value;
	console.log(program);
	console.log(typeof(program));
	var pArray = programToArray(program);
	var i,j;
	for(i=0;i<pArray.length;i++)
	{
		console.log(pArray[i]);
		if(pArray[i][0] == undefined)
			break;
	}
	processor proc = new processor();

}

function programToArray(program)
{
	var i;
	var j = 0;
	var parsedProgram = new Array(100);

	for(i=0;i<parsedProgram.length;i++)
	{
			parsedProgram[i] = new Array(30);
	}

	for(i=0;i<program.length;i++)
	{
		if(program[i] == " ")
		{
			j++;
		}
		else
		{
			for(i=0;i<parsedProgram[j].length;i++)
			{
				parsedProgram[j][i] = program[i];
			}
		}
	}
	return parsedProgram;
}
