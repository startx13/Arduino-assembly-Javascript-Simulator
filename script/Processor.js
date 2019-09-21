class Processor{
	constructor(program,pl)
	{
		this.prog = program;
		this.pl = pl;
		//memory = new Memory(program);
		this.procStatus = new ProcessorStatus();
		this.operationList = new Operation();
		//add op here
		
		//add: add two registers , Rd, Rr, [Z,C,N,V,H]
		var addF = function(op,procStatus)
		{				
			var regInt1v = op[0].split("r");
			var regInt1 = Number(regInt1v[1]);
			
			var regInt2v = op[1].split("r");
			var regInt2 = Number(regInt2v[1]);
	
			var result = Number(procStatus.getReg(regInt1)) + Number(procStatus.getReg(regInt2)); // + Number(procStatus.flags[progStatus.C]);

			if (result == 0)
			{
				procStatus.flags[progStatus.Z] = true;
			}	
			else if (result > 255)
			{
				procStatus.flags[progStatus.V] = true; // overflow
			}	
			else if (result < 0)
			{
				procStatus.flags[progStatus.N] = true;
			}
			
			// TO DO: 	procStatus.flags[progStatus.C] = false; 

			procStatus.setReg(regInt1,result);	
						
		}
		// sbc: subtract with carry two registers , Rd, Rr, [Z,C,N,V,H]
		var sbcF = function(op,procStatus)
		{				
	        var regInt1v = op[0].split("r");
	        var regInt1 = Number(regInt1v[1]);
	
			var regInt2v = op[1].split("r");
			var regInt2 = Number(regInt2v[1]);
	
			var result = Number(procStatus.getReg(regInt1)) - Number(procStatus.getReg(regInt2)) - Number(procStatus.flags[progStatus.C]);

			if (result == 0)
			{
				procStatus.flags[progStatus.Z] = true;
			}	
			else if (result > 255)
			{
				procStatus.flags[progStatus.V] = true; // overflow
			}	
			else if (result < 0)
			{
				procStatus.flags[progStatus.N] = true;
			}		
			// TO DO: 	procStatus.flags[progStatus.C] = false; 		
			procStatus.setReg(regInt1,result);
		}
		
		// mov: move between registers, copy data between register, Rd, Rr, [none]
		var movF = function(op,procStatus)
		{				
        	var regInt1v = op[0].split("r");
        	var regInt1 = Number(regInt1v[1]);
			
			var regInt2v = op[1].split("r");
			var regInt2 = Number(regInt2v[1]);
	
			var result = Number(procStatus.getReg(regInt2));
			procStatus.setReg(regInt1,result);				
		}
		
		// ldi: load immediate (constant value) Rd, K, [none]
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
		
		// inc: increment Rd [Z,N,V]
		var incF = function(op,procStatus)
		{
			if(typeof op[0] === 'string')
			{
				var regIntv = op[0].split("r");
 				var regInt = Number(regIntv[1]);

				//var val = Number(op[1]); inutile?
	
				result =  procStatus.getReg(regInt) + 1;

				procStatus.setReg(regInt,result);
				
				if (result == 0)
				{
					procStatus.flags[progStatus.Z] = true;
				}	
				else if (result > 255)
				{
					procStatus.flags[progStatus.V] = true; // overflow
				}	
				else if (result < 0)
				{
					procStatus.flags[progStatus.N] = true;
				}
			}
			
			
		}
		
		// neg, difference between constant $00 and register , Rd,  [Z,C,N,V,H]
		var negF = function(op,procStatus)
		{
			if(typeof op[0] === 'string')
			{
				var regIntv = op[0].split("r");
				var regInt = Number(regIntv[1]);

				var val = Number(op[1]);
				
				result = 0 - procStatus.getReg(regInt);
				
				procStatus.setReg(regInt,result);
				
				if (result == 0)
				{
					procStatus.flags[progStatus.Z] = true;
				}	
				else if (result > 255)
				{
					procStatus.flags[progStatus.V] = true; // overflow
				}	
				else if (result < 0)
				{
					procStatus.flags[progStatus.N] = true;
				}
			}
		}
		
		//jmp, direct jump, PC<-k
		var jmpF = function(op,procStatus)
		{
			procStatus.PC = Number(op[0]);
		}
		
		//clr, clear register
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
		
		//out, write out to I/O port 
		var outF = function(op,procStatus)
		{
			if(typeof op[0] === 'string')
			{
				 // TO DO: deve accettare tutti i registri PortB, DDRB, PortC, DDRC, PortD, DDRD
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
