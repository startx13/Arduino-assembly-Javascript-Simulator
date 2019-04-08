class ProcessorStatus
{
	/*
	 *https://en.wikipedia.org/wiki/Atmel_AVR_instruction_set
	 *0 - C Carry flag. This is a borrow flag on subtracts. The INC and DEC instructions do not modify the carry flag, so they may be used to loop 		 
	 *over multi-byte arithmetic operations.[1]
	 *1 - Z Zero flag. Set to 1 when an arithmetic result is zero.
	 *2 - N Negative flag. Set to a copy of the most significant bit of an arithmetic result.
	 *3 - V Overflow flag. Set in case of two's complement overflow.
	 *4 - S Sign flag. Unique to AVR, this is always N⊕V, and shows the true sign of a comparison.
	 *5 - H Half-carry flag. This is an internal carry from additions and is used to support BCD arithmetic.
	 *6 - T Bit copy. Special bit load and bit store instructions use this bit.
	 *7 - I Interrupt flag. Set when interrupts are enabled.
	*/
	//var flags;
	//var gpRegs; 	//8bit!! max 255
	//var PC;   	//16/22 bit!!
	//var SP;   	//8/16 bit!!
	//var SREG; 	//8bit!! max 255

	constructor()
	{
		this.gpRegs = new Array(32); //R0-->R31
		this.PC = 0;
		this.SP = 0;

		this.portB = new Array(8);
		this.portC = new Array(8);
		this.portD = new Array(8);

		this.SREG = new Array(8);;
		this.hex = false;		

		for(var i=0;i<32;i++)
		{
			this.gpRegs[i] = 0;
		}
		
		for(var i=0;i<8;i++)
		{
			this.SREG[i] = false;
		}
		
		for(var i=0;i<8;i++)
		{
			this.portB[i] = 0;
			this.portC[i] = 0;
			this.portD[i] = 0;
		}

	}

	updateUI()
	{
		if(this.SREG[2] || this.SREG[3])
		{
			this.SREG[4] = true;
		}
		else		
		{
			this.SREG[4] = false;		
		}

		if(!this.hex)
		{
			this.updateUIDec();		
		}
		else
		{
			this.updateUIHex();		
		}

	}

	updateUIDec()
	{
		//GP registers
		for(var i=0;i<32;i++)
		{
			var nomeReg = "r"+i;
			document.getElementById(nomeReg).innerHTML = "" + this.gpRegs[i];
			//console.log(nomeReg + " = " + this.gpRegs[i]); //debug regs
		}

		//ports		
		document.getElementById("PortB").innerHTML = "" + this.portB[0] + this.portB[1] + this.portB[2] + this.portB[3] + " " + this.portB[4] + this.portB[5] + this.portB[6] + this.portB[7];
		document.getElementById("PortC").innerHTML = "" + this.portC[0] + this.portC[1] + this.portC[2] + this.portC[3] + " " + this.portC[4] + this.portC[5] + this.portC[6] + this.portC[7];
		document.getElementById("PortD").innerHTML = "" + this.portD[0] + this.portD[1] + this.portD[2] + this.portD[3] + " " + this.portD[4] + this.portD[5] + this.portD[6] + this.portD[7];

		//Flags
		document.getElementById("PC").innerHTML = "" + this.PC;
		document.getElementById("Carry").innerHTML = "" + this.SREG[0];
		document.getElementById("Zero").innerHTML = "" + this.SREG[1];
		document.getElementById("Negative").innerHTML = "" + this.SREG[2];
		document.getElementById("Overflow").innerHTML = "" + this.SREG[3];
		document.getElementById("Sign").innerHTML = "" + this.SREG[4];
		document.getElementById("HCarry").innerHTML = "" + this.SREG[5];
		document.getElementById("BitCopy").innerHTML = "" + this.SREG[6];
		document.getElementById("Interrupt").innerHTML = "" + this.SREG[7];
		
	}

	intToHex(number)
	{
		var hexString = number.toString(16);

		if(hexString.length % 2)
		{
			hexString = '0' + hexString;	
		} 	
		
		return hexString;
	}	
	
	intToBin(number)
	{
		return (number >>> 0).toString(2);
	}

	updateUIHex()
	{
		//GP registers
		for(var i=0;i<32;i++)
		{
			var nomeReg = "r"+i;
			document.getElementById(nomeReg).innerHTML = "" + this.intToHex(this.gpRegs[i]);
			//console.log(nomeReg + " = " + this.gpRegs[i]); //debug regs
		}		

		//ports		
		document.getElementById("PortB").innerHTML = "" + this.portB[0] + this.portB[1] + this.portB[2] + this.portB[3] + " " + this.portB[4] + this.portB[5] + this.portB[6] + this.portB[7];
		document.getElementById("PortC").innerHTML = "" + this.portC[0] + this.portC[1] + this.portC[2] + this.portC[3] + " " + this.portC[4] + this.portC[5] + this.portC[6] + this.portC[7];
		document.getElementById("PortD").innerHTML = "" + this.portD[0] + this.portD[1] + this.portD[2] + this.portD[3] + " " + this.portD[4] + this.portD[5] + this.portD[6] + this.portD[7];

		//Flags
		document.getElementById("PC").innerHTML = "" + this.intToHex(this.PC);
		document.getElementById("Carry").innerHTML = "" + this.SREG[0];
		document.getElementById("Zero").innerHTML = "" + this.SREG[1];
		document.getElementById("Negative").innerHTML = "" + this.SREG[2];
		document.getElementById("Overflow").innerHTML = "" + this.SREG[3];
		document.getElementById("Sign").innerHTML = "" + this.SREG[4];
		document.getElementById("HCarry").innerHTML = "" + this.SREG[5];
		document.getElementById("BitCopy").innerHTML = "" + this.SREG[6];
		document.getElementById("Interrupt").innerHTML = "" + this.SREG[7];	
	}

	//API
	setReg(numReg,val)
	{
		if(numReg >=0 || numReg <32)
		{
			if(val <256)
			{						
				this.gpRegs[numReg] = val;		
			}
			else
			{
				this.gpRegs[numReg] = 255;			
			}		
		}
	}

	getReg(numReg)
	{
		var val = 0;
		if(numReg >=0 || numReg < 32)
		{
			val = this.gpRegs[numReg];		
		}
		return val;
	}

	writePortB(number)
	{
		var bin;
		if(number<256 && number>=0)
		{
			bin = this.intToBin(number);
		}
		else
		{
			if(number>0)
			{
				bin = this.intToBin(255);			
			}
			else
			{
				bin = this.intToBin(0);			
			}
		}
		console.log(bin);

		var offset = this.portB.length - bin.length;
		
		for(var i = bin.length-1; i>=0 ; i--)
		{
			this.portB[offset + i] = bin[i];			
		}
	}

	writePortC(number)
	{
		var bin;
		if(number<256 && number>=0)
		{
			bin = this.intToBin(number);
		}
		else
		{
			if(number>0)
			{
				bin = this.intToBin(255);			
			}
			else
			{
				bin = this.intToBin(0);			
			}
		}		
		for(var i = bin.length ; i<=0 ; i--)
		{
			this.portC[i] = bin[i];			
		}
	}

	writePortD(number)
	{
		var bin;
		if(number<256 && number>=0)
		{
			bin = intToBin(number);
		}
		else
		{
			if(number>0)
			{
				bin = this.intToBin(255);			
			}
			else
			{
				bin = this.intToBin(0);			
			}
		}		
		for(var i = bin.length-1 ; i<=0 ; i--)
		{
			this.portD[i] = bin[i];			
		}
	}	

	//FINE API
	
	reset()
	{
		
		this.PC = 0;
		
		for(var i=0;i<8;i++)
		{
			this.flags[i] = 0;		
		}		

		for(var i=0;i<32;i++)
		{
			this.SREG[i] = 0;
		}		
		
		this.updateUI();
	}
}
