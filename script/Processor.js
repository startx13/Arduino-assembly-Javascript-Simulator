class Processor{

  	var procStatus = null;
  	var memory = null;
	var prog = null;

  	Processor(program)
  	{
		this.prog = program;
    		//memory = new Memory(program);
    		//procStatus = new ProcessorStatus();
  	}

  	function start()
	{
		var line;
		var i=0;
		for(i=0;i<prog.length;i++)
		{
			line = parseLine(prog[i]);
			console.log(line);
		}
		
	}
	
	function parseLine(line)
	{
		return line.split(" ");
	}

}
