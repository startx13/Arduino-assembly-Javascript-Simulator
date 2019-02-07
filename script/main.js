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

function stepProgram()
{
	if(proc == null)
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
	}	
	proc.step();

}

function reset()
{
	if(proc != null)
	{	
		proc.procStatus.reset();
	}
}


function cambiaValori()
{
	if(proc != null)
	{
		proc.procStatus.hex = !proc.procStatus.hex;
		proc.procStatus.updateUI();
	}
}

function programToArray(program)
{
	var i;
	var j = 0;
	var parsedProgram = new Array(100);

	parsedProgram = program.split('\n');

	var cleanedProgram = new Array(100);	
	var trovato = false;
	var oldJ = 0;

	for(var i = 0;i<cleanedProgram.length;i++)
	{ 		
		for(var j = oldJ;j<parsedProgram.length && !trovato;j++)
		{
			if(parsedProgram[j][0] != ';' && !(parsedProgram[j] === "") && !(parsedProgram[j] === " ") && 
			   !(parsedProgram[j] === "") && !(parsedProgram[j] === "\n"))
			{
				cleanedProgram[i] = parsedProgram[j];
				oldJ = j + 1 ;				
				trovato = true;			
			}		
		}
		trovato = false;
	}

	return cleanedProgram;
}
