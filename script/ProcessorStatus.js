class ProcessorStatus
{
	/*
	 *https://en.wikipedia.org/wiki/Atmel_AVR_instruction_set
	 *C Carry flag. This is a borrow flag on subtracts. The INC and DEC instructions do not modify the carry flag, so they may be used to loop 		 
	 *over multi-byte arithmetic operations.[1]
	 *Z Zero flag. Set to 1 when an arithmetic result is zero.
	 *N Negative flag. Set to a copy of the most significant bit of an arithmetic result.
	 *V Overflow flag. Set in case of two's complement overflow.
	 *S Sign flag. Unique to AVR, this is always N⊕V, and shows the true sign of a comparison.
	 *H Half-carry flag. This is an internal carry from additions and is used to support BCD arithmetic.
	 *T Bit copy. Special bit load and bit store instructions use this bit.
	 *I Interrupt flag. Set when interrupts are enabled.
	*/
	//var flags;
	//var gpRegs; 	//8bit!! max 255
	//var PC;   	//16/22 bit!!
	//var SP;   	//8/16 bit!!
	//var SREG; 	//8bit!! max 255

	constructor()
	{
		this.flags = new Array(8);
		this.gpRegs = new Array(32);//new Array(32); //R0-->R31
		this.PC = 0;
		this.SP = 0;
		this.SREG = 0;
		this.hex = false;		

		for(var i=0;i<32;i++)
		{
			this.gpRegs[i] = 0;
		}
		
		for(var i=0;i<8;i++)
		{
			this.flags[i] = 0;
		}

	}

	updateUI()
	{
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
		document.getElementById("Carry").innerHTML = "" + this.flags[0];
		document.getElementById("Zero").innerHTML = "" + this.flags[1];
		document.getElementById("Negative").innerHTML = "" + this.flags[2];
		document.getElementById("Overflow").innerHTML = "" + this.flags[3];
		document.getElementById("Sign").innerHTML = "" + this.flags[4];
		document.getElementById("HCarry").innerHTML = "" + this.flags[5];
		document.getElementById("BitCopy").innerHTML = "" + this.flags[6];
		document.getElementById("Interrupt").innerHTML = "" + this.flags[7];
		
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
		document.getElementById("PC").innerHTML = "" + this.PC;
		document.getElementById("Carry").innerHTML = "" + this.flags[0];
		document.getElementById("Zero").innerHTML = "" + this.flags[1];
		document.getElementById("Negative").innerHTML = "" + this.flags[2];
		document.getElementById("Overflow").innerHTML = "" + this.flags[3];
		document.getElementById("Sign").innerHTML = "" + this.flags[4];
		document.getElementById("HCarry").innerHTML = "" + this.flags[5];
		document.getElementById("BitCopy").innerHTML = "" + this.flags[6];
		document.getElementById("Interrupt").innerHTML = "" + this.flags[7];
	}

	setReg(numReg,val)
	{
		if(numReg >=0 || numReg <32)
		{
			if(val <256)
			{						
				gpRegs[numReg] = val;		
			}
			else
			{
				gpRegs[numReg] = 255;			
			}		
		}
	}

	reset()
	{
		
		this.PC = 0;
		
		for(var i=0;i<8;i++)
		{
			this.flags[i] = 0;		
		}		

		for(var i=0;i<32;i++)
		{
			this.gpRegs[i] = 0;
		}		
		
		this.updateUI();
	}
}
