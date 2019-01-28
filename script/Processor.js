class Processor{

  	constructor(program)
  	{
		this.prog = program;
    	//memory = new Memory(program);
    	this.procStatus = new ProcessorStatus();
		this.operationList = new Operation();
        //add op here
		
        //add
        var addF = function(op,procStatus)
		{				
        	var regInt1v = op[0].split("r");
        	var regInt1 = Number(regInt1v[1]);
			
		    var regInt2v = op[1].split("r");
       		var regInt2 = Number(regInt2v[1]);
	
			var b = Number(procStatus.gpRegs[regInt1]) + Number(procStatus.gpRegs[regInt2]);
			procStatus.gpRegs[regInt1] = b;				
        }

		var sbcF = function(op,procStatus)
		{				
        	var regInt1v = op[0].split("r");
        	var regInt1 = Number(regInt1v[1]);
			
		    var regInt2v = op[1].split("r");
       		var regInt2 = Number(regInt2v[1]);
	
			var b = Number(procStatus.gpRegs[regInt1]) - Number(procStatus.gpRegs[regInt2]);
			procStatus.gpRegs[regInt1] = b;				
        }
		
		var movF = function(op,procStatus)
		{				
        	var regInt1v = op[0].split("r");
        	var regInt1 = Number(regInt1v[1]);
			
		    var regInt2v = op[1].split("r");
       		var regInt2 = Number(regInt2v[1]);
	
			var b = Number(procStatus.gpRegs[regInt2]);
			procStatus.gpRegs[regInt1] = b;				
        }
		
        var ldiF = function(op,procStatus)
		{
            if(typeof op[0] === 'string')
        		{
        			var regIntv = op[0].split("r");
        			var regInt = Number(regIntv[1]);

        			var val = Number(op[1]);

				    procStatus.gpRegs[regInt] = val;
			    }
        }

		var incF = function(op,procStatus)
		{
            if(typeof op[0] === 'string')
        		{
        			var regIntv = op[0].split("r");
        			var regInt = Number(regIntv[1]);

        			var val = Number(op[1]);

				    procStatus.gpRegs[regInt] = procStatus.gpRegs[regInt] + 1;
			    }
        }
		
		var negF = function(op,procStatus)
		{
            if(typeof op[0] === 'string')
        		{
        			var regIntv = op[0].split("r");
        			var regInt = Number(regIntv[1]);

        			var val = Number(op[1]);

				    procStatus.gpRegs[regInt] = procStatus.gpRegs[regInt] * (-1);
			    }
        }
		
		var jmpF = function(op,procStatus)
		{
			procStatus.PC = Number(op[0]);
		}
		
        this.operationList.addOperation("ldi",ldiF)
       	this.operationList.addOperation("add",addF);
		this.operationList.addOperation("sbc",sbcF);
		this.operationList.addOperation("mov",movF);
		this.operationList.addOperation("inc",incF);
		this.operationList.addOperation("neg",negF);
		this.operationList.addOperation("jmp",jmpF);
		
  	}



    	start()
  	{
  		var line;
  		var command;
  		var op = new Array(2);
  		var i=0;

  		for(i=0;i<this.prog.length;i++)
  		{  			
			if(this.prog[i][0] != ';')
			{
				line = this.prog[i].split(" ");
		  		command = line[0];
	  			line = line[1].split(",");
	  			op[0] = line[0];
	  			op[1] = line[1];
	  			this.procStatus.PC = i; //+ 1;
			    	this.execInstruction(command,op);			  
				this.procStatus.updateUI();
				i = this.procStatus.PC;
			}  		
		}

  	}

	step()
	{
		var line;
  		var command;
  		var op = new Array(2);
				
		if(this.prog.length > this.procStatus.PC)
		{
			line = this.prog[this.procStatus.PC].split(" ");
			command = line[0];
		  	line = line[1].split(",");
		  	op[0] = line[0];
		  	op[1] = line[1];
		  	this.procStatus.PC += 1;
			this.execInstruction(command,op);			  
			this.procStatus.updateUI();
		}	
	}
	
	reset()
	{	
		this.procStatus.reset();		
	}		
	
	execInstruction(instr,op)
	{
		    this.operationList.exec(instr,op,this.procStatus);
  	}
}
