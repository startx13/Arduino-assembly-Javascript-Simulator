class Processor{
	constructor(program,pl)
	{
		this.prog = program;
		this.pl = pl;
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
	
			var b = Number(procStatus.getReg(regInt1)) + Number(procStatus.getReg(regInt2));

			if(b == 0)
			{
				procStatus.flags[1] = true;
			}			
			
			procStatus.setReg(regInt1,b);				
		}

		var sbcF = function(op,procStatus)
		{				
	        	var regInt1v = op[0].split("r");
	        	var regInt1 = Number(regInt1v[1]);
	
			var regInt2v = op[1].split("r");
			var regInt2 = Number(regInt2v[1]);
	
			var b = Number(procStatus.getReg(regInt1)) - Number(procStatus.getReg(regInt2));

			if(b == 0)
			{
				procStatus.flags[1] = true;
			}			
					
			procStatus.setReg(regInt1,b);				
		}
		
		var movF = function(op,procStatus)
		{				
        		var regInt1v = op[0].split("r");
        		var regInt1 = Number(regInt1v[1]);
			
			var regInt2v = op[1].split("r");
			var regInt2 = Number(regInt2v[1]);
	
			var b = Number(procStatus.getReg(regInt2));
			procStatus.setReg(regInt1,b);				
		}
		
		var ldiF = function(op,procStatus)
		{
			if(typeof op[0] === 'string')
			{
				var regIntv = op[0].split("r");
				var regInt = Number(regIntv[1]);

				var val = Number(op[1]);
				procStatus.setReg(regInt,val);
			}
		}

		var incF = function(op,procStatus)
		{
			if(typeof op[0] === 'string')
			{
				var regIntv = op[0].split("r");
 				var regInt = Number(regIntv[1]);

				var val = Number(op[1]);

				procStatus.setReg(regInt, procStatus.getReg(regInt) + 1);
			}
		}
		
		var negF = function(op,procStatus)
		{
			if(typeof op[0] === 'string')
			{
				var regIntv = op[0].split("r");
				var regInt = Number(regIntv[1]);

				var val = Number(op[1]);

				procStatus.setReg(regInt, procStatus.getReg(regInt) * (-1));
			}
		}
		
		var jmpF = function(op,procStatus)
		{
			procStatus.PC = Number(op[0]);
		}

		var clrF = function(op,procStatus)
		{
			if(typeof op[0] === 'string')
			{
				var regIntv = op[0].split("r");
				var regInt = Number(regIntv[1]);

				var val = 0;
				procStatus.setReg(regInt,val);
			}
		}
		
		var outF = function(op,procStatus)
		{
			if(typeof op[0] === 'string')
			{
				if(op[0] === "PortB")
				{
					var regIntv = op[0].split("r");
					var regInt = Number(regIntv[1]);
					procStatus.writePortB(procStatus.getReg(regInt));				
				}
			}
		}		
		
		this.operationList.addOperation("ldi",ldiF)
		this.operationList.addOperation("add",addF);
		this.operationList.addOperation("sbc",sbcF);
		this.operationList.addOperation("mov",movF);
		this.operationList.addOperation("inc",incF);
		this.operationList.addOperation("neg",negF);
		this.operationList.addOperation("jmp",jmpF);
		this.operationList.addOperation("clr",clrF);
		this.operationList.addOperation("out",outF);
		
  	}



    	start()
  	{
  		var line;
  		var command;
  		var op = new Array(2);
  		var i=0;
		
		
					
		for(i=0;i<this.pl;i++)
  		{  		
			line = this.prog[i].split(" ");				
			if(this.procStatus.PC < this.pl)
			{							
				command = line[0];
			  	line = line[1].split(",");
			  	op[0] = line[0];
			  	op[1] = line[1];
				this.procStatus.PC = i; 
				this.execInstruction(command,op);			  
				this.procStatus.updateUI();
				i = this.procStatus.PC; 
				this.procStatus.writePortB(10);		
			}
		}
  	}

	step()
	{
		var line;
  		var command;
  		var op = new Array(2);		
		
		if(this.procStatus.PC < this.pl)
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
	
	execInstruction(instr,op)
	{
		    this.operationList.exec(instr,op,this.procStatus);
  	}
}
