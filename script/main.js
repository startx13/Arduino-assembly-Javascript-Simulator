var proc = null;
function execProgram()
{

	var program = document.getElementById("program").value;
	var pArray = programToArray(program);
	var i,j;
	for(i=0;i<pArray.length;i++)
	{
		if(pArray[i] == "")
			break;
	}
	proc = new Processor(pArray);
	proc.start();

}

function programToArray(program)
{
	var i;
	var j = 0;
	var parsedProgram = new Array(100);

	parsedProgram = program.split('\n');
	return parsedProgram;
}
