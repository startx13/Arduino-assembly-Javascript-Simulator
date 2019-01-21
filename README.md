# Arduino-assembly-Javascript-Simulator
Questo programma è un simulatore del microcontrollore di Arduino. Il programma è modulare poichè si possono aggiungere operazioni.

## Aggiunta Operazioni
Una operazione può essere aggiunta semplicemente modificando il file script/Processor.js
Per aggiungere una operazione bisogna scriverla sottoforma di funzione nella apposita sezione e i cui parametri sono un array di operandi e lo stato del processore. 

Ad esempio
```javascript
var addF = function(op,procStatus){...} 
```
è una scrittura valida.

Gli operandi sono un array con due indici, quindi se nel codice abbiamo, ad esempio
```javascript
r0,r1
```
L'array sarà
```javascript
op[0] == "r0"
e
op[1] == "r1"
```

Dopo aver scritto la funzione questa va aggiunta alla lista delle operazioni disponibili scrivendo nell'apposita sezione

```javascript
this.operationList.addOperation("add",addF);
```
in cui "add" sarà il nome dell'operazione e addF la funzione appena creata.

## Esempio di operazione

```javascript
var addF = function(op,procStatus)
{				
  var regInt1v = op[0].split("r");
  var regInt1 = Number(regInt1v[1]);
  var regInt2v = op[1].split("r");
  var regInt2 = Number(regInt2v[1]);
  var b = Number(procStatus.gpRegs[regInt1]) + Number(procStatus.gpRegs[regInt2]);
  procStatus.gpRegs[regInt1] = b;				
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
  this.flags = new Array(8); //Flag del processore
  this.gpRegs = new Array(32); //R0-->R31 registri generici
  this.PC = 0; //Program Counter
  this.SP = 0; //Stack Pointer
  this.SREG = 0; 

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
