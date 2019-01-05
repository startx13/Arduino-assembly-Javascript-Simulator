class Processor{

  	constructor(program)
  	{
		      this.prog = program;
    		  //memory = new Memory(program);
    		  this.procStatus = new ProcessorStatus();
		      this.operationList = new Operation();
        	//add op here

        	//add
        	var addF = function(op,procStatus){
        		if(typeof op[0] === 'string')
        		{
        			var regInt1v = op[0].split("r");
        			var regInt1 = Number(regInt1v[1]);

        			var regInt2v = op[1].split("r");
        			var regInt2 = Number(regInt1v[1]);

				      var b = procStatus.gpRegs[regInt1] + procStatus.gpRegs[regInt2];
				      procStatus.gpRegs[regInt1] = b;
			      }
        	}

          var ldiF = function(op,procStatus){
            if(typeof op[0] === 'string')
        		{
        			var regIntv = op[0].split("r");
        			var regInt = Number(regInt1v[1]);

        			var val = Number(op[1]);

				      procStatus.gpRegs[regInt] = val;
			      }

          }

          this.operationList.addOperation("ldi",ldiF)
        	this.operationList.addOperation("add",addF);



  	}



    start()
  	{
  		var line;
  		var command;
  		var op = new Array(2);
  		var i=0;

  		for(i=0;i<this.prog.length;i++)
  		{
  			line = this.prog[i].split(" ");
  			command = line[0];
  			line = line[1].split(",");
  			op[0] = line[0];
  			op[1] = line[1];
  			this.procStatus.PC = this.procStatus.PC + 1;
        this.execInstruction(command,op);
			  this.procStatus.updateUI();
  		}

  	}

	  execInstruction(instr,op)
	  {
		    this.operationList.exec(instr,op,this.procStatus);
  	}
}
