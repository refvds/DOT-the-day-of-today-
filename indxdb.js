export class INDXDB {
   
    constructor(nameDB, version) {
        this.nameDB = nameDB;
        this.version = version;
        this.open()
    }

     open() {
        return new Promise(async(res, rej) => {
            this.dbOpenRequest =  await indexedDB.open(this.nameDB, this.version);
           
            this.dbOpenRequest.onerror = (err) => {
                console.error(`DB doesn't open or create: ${err}`);
            };
            this.dbOpenRequest.onsuccess = (event) => {
                this.db = event.target.result;
                res(this.db)
                console.log('DB has success');
            }
            this.dbOpenRequest.onupgradeneeded = (event) => {
                this.db = event.target.result;
                const objectStore = this.db.createObjectStore('wallpapersStore');
                objectStore.transaction.oncomplete = () => {
                    console.log('Object store was created');
                }
                res(db);
            }
        })
       
    }

    putData = async ( data) => {
             const open = await this.open();
            const transaction = await this.db.transaction('wallpapersStore', 'readwrite');
            const objectStore = transaction.objectStore('wallpapersStore', {
                keyPath: 'id'
            })
                
            return new Promise((res, rej) => {
                transaction.oncomplete = () => {
                    console.log('transaction has been complete');
                    res(true)
                }

                transaction.onerror = (err) => {
                    console.error(`some problems with transactions ${err}`);
                    rej(false)
                }
             
                data.forEach((dataObj) => {
                    const request = objectStore.add(dataObj.img,dataObj.id);
                    request.onsuccess = () => {
                        console.log('Added: ', dataObj);
                    }
                    
                    request.onerror = (err) => {
                        console.err(err)
                    }    
                });               
            });        
        
    }

    async getData() {
        const open = await this.open();
            const transaction = await this.db.transaction('wallpapersStore','readonly')
            const objStore = transaction.objectStore('wallpapersStore');
    
            return new Promise((res, rej)=>{
                const request = objStore.getAll();
                request.onsuccess = (event) => {
                    console.log('success get data')
                    res(event.target.result)
                }
                request.onerror = (err) => {
                    console.err(`something went wrong with get data ${err}`);
                }
            });
            
        
    }
}