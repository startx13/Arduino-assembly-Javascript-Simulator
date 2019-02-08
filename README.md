# Arduino-assembly-Javascript-Simulator
Questo programma è un simulatore (emulatore) del microcontrollore di Arduino Uno. Esso permette di eseguire all'interno di un browser un programma scritto in linguaggio Assembly per il microcontrollore ATmega328P.
Il programma è modulare, cioè è fatto in modo che sia semplice aggiungere una nuova istruzione Assembly al set di istruzioni attualmente eseguibili da questo emulatore.

## Aggiungere una nuova Istruzione
Per aggiungere una nuova istruzione Assembly si deve modificare il file script/Processor.js
Ogni diversa istruzione Assembly è descritta come una diversa funzione nel file script/Processor.js, in una apposita  sezione. I parametri di ognuna di queste diverse funzioni sono due: un array (che contiene tutti gli operandi) e un oggetto (che rappresenta lo stato del processore). 

Ad esempio, se si desidera aggiungere l'istruzione assembly `add` si dovrà aggiungere questo codice:
```javascript
var addF = function(op,procStatus){...} 
```

Continuando l'esempio, si deve conoscere la sintassi in Assembly di `add`, che si deve usare in questo modo:
```javascript
add r0,r1
```

Quindi si devono aggiungere anche i due operandi della funzione `add`, che sono due registri `r0` e `r1`. Questi devono essere contenuti in un array `op`, con due indici:
```javascript
op[0] // op[0] == "r0"
op[1] // op[1] == "r1"
```

Si devono poi aggiungere le istruzioni da eseguire nel caso di `add`
```
var b = Number(x) + Number(y) 
```

Dopo aver scritto la funzione questa va aggiunta alla lista delle operazioni disponibili scrivendo nell'apposita sezione
```javascript
this.operationList.addOperation("add",addF);
```

in cui "add" sarà il nome dell'operazione e addF la funzione appena creata.

## Esempio completo

```javascript
var addF = function(op,procStatus)
		{				
			var regInt1v = op[0].split("r");
			var regInt1 = Number(regInt1v[1]);
			
			var regInt2v = op[1].split("r");
			var regInt2 = Number(regInt2v[1]);
	
			var b = Number(procStatus.getReg(regInt1)) + Number(procStatus.getReg(regInt2));

			if(b == 0)
			{
				procStatus.flags[1] = 1;
			}			
			
			procStatus.setReg(regInt1,b);				
		}

this.operationList.addOperation("add",addF);
```
## Oggetto procStatus

Insieme agli operandi viene passato anche un riferimento ad un oggetto procStatus.
Questo oggetto descrive lo stato del processore quindi conterrà un program counter, le flag, i registri, ecc.

Costruttore dell'oggetto:
```javascript
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
```
## Modifica registri (API di procStatus)

Per modificare i registri è necessario usare, dove possibile, le funzioni contenute nell'oggetto procStatus poichè
queste sono "bit safe" (fanno rientrare i valori nei limiti di arduino) e modificano automaticamente (dove necessario) le flag del processore.
API disponibili: <br>
- `setReg(numReg,val)` permette di modificare i registri nei limiti di arduino
- `getReg(numReg)`     ritorna il valore del registro indicato
