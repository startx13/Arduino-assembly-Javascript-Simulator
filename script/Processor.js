class Processor{


  	constructor(program)
  	{
			
		this.prog = program;
    		//memory = new Memory(program);
    		procStatus = new ProcessorStatus();
  	}

  	start()
	{
		var line;
		var command;
		var op = new Array(2);
		var i=0;
		for(i=0;i<prog.length;i++)
		{
			line = parseLine(prog[i]);
			command = line[0];
			line = divideOperand(line[1]);
			op[0] = line[0];
			op[1] = line[1];
			procStatus.PC = procStatus.PC + 1;
			 			
		}

	}

	divideCommand(line)
	{
		return line.split(" ");
	}
	
	divideOperand(line)
	{
		return line.split(",");
	}

  	execInstruction(instr,op)
	{
			
	}

}
