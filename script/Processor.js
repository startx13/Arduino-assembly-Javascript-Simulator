class Processor{


  	constructor(program)
  	{
		this.prog = program;
    		//memory = new Memory(program);
    		//procStatus = new ProcessorStatus();
  	}

  	start()
	{
		var line;
		var i=0;
		for(i=0;i<prog.length;i++)
		{
			line = parseLine(prog[i]);
			console.log(line);
		}
		
	}
	
	parseLine(line)
	{
		return line.split(" ");
	}

}
