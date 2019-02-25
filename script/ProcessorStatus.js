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
	
	updateUIHex()
	{
		//GP registers
		for(var i=0;i<32;i++)
		{
			var nomeReg = "r"+i;
			document.getElementById(nomeReg).innerHTML = "" + this.intToHex(this.gpRegs[i]);
			//console.log(nomeReg + " = " + this.gpRegs[i]); //debug regs
		}		

		//Flags
		document.getElementById("PC").innerHTML = "" + this.intToHex(this.PC);
		document.getElementById("Carry").innerHTML = "" + this.SREG[0];
		document.getElementById("Zero").innerHTML = "" + this.SREG[1];
		document.getElementById("Negative").innerHTML = "" + this.SREG[2];
		document.getElementById("Overflow").innerHTML = "" + this.SREG[3];
		document.getElementById("Sign").innerHTML = "" + this.SREG[4];
		document.getElementById("HCarry").innerHTML = "" + this.SREG[5];
		document.getElementById("BitCopy").innerHTML = "" + this.SREG[6];
		document.getElementById("Interrupt").innerHTML = "" + this.SREG[7];	}
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
		if(numReg >=0 || numReg < 32)
		{
			return this.gpRegs[numReg];		
		}
		else
		{
			return 0;		
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
