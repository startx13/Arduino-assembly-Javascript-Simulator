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

  execInstr(line)
  {
      switch (line[0]) {
        case 'mov':
          mov(line[1],line[3]);
          break;
        case 'add':
          add(line[1],line[3]);
          break;
        default:


      }
  }

  //All instructions

  mov(a,b)
  {

  }

  add(a,b)
  {

    
  }

}
