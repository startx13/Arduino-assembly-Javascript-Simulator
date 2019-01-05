class ProcessorStatus
{
	/*
	 *https://en.wikipedia.org/wiki/Atmel_AVR_instruction_set
	 *C Carry flag. This is a borrow flag on subtracts. The INC and DEC instructions do not modify the carry flag, so they may be used to loop 		 *over multi-byte arithmetic operations.[1]
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
		for(var i=0;i<32;i++)
		{
			this.gpRegs[i] = 0;
		}

	}

	updateUI()
	{

		for(var i=0;i<32;i++)
		{
				var nomeReg = "r"+i;
				document.getElementById(nomeReg).innerHTML = "" + this.gpRegs[i];
				console.log(nomeReg + " = " + this.gpRegs[i]);
		}
	}
}
