class TicketManager {
    #priceBaseGain = 0.15;
    constructor(){
        this.events = [];
    }

    addEvent(name, site, price, capacity = 50, date = new Date()){
        const event = {
            id: this.#getMaxId() + 1,
            name,
            site,
            capacity,
            price: price + this.#priceBaseGain,
            date,
            participants: []
        };
        this.events.push(event);
    }

    #getMaxId() {
        let maxId = 0;
        this.events.map((event) => { 
        if (event.id > maxId) maxId = event.id;
        });
        return maxId;
    }

    getEvents() {
        return this.events;
    }

    addUser(idEvent, idUser){
        const event = this.#getEvent(idEvent);
        if(event){
            if(!event.participants.includes(idUser)) event.participants.push(idUser);
        } else return 'this event not exists';
    }

    #getEvent(idEvent){
        return this.events.find((event) => event.id === idEvent);
    }

    eventTour(idEvent, newSite, newDate) {
        const event = this.#getEvent(idEvent);
        if(event) {
            const newEvent = {
                ...event,
                id: this.#getMaxId() + 1,
                site: newSite,
                date: newDate,
                participants: []
            };
            this.events.push(newEvent);
        } else return 'this event not exists';
    }
}

const ticketManager = new TicketManager();

ticketManager.addEvent('Lolapalooza', 'Buenos Aires', 200000, 750000);
ticketManager.addEvent('Cosquin Rock', 'Santa Maria de Punilla - Córdoba', 300000, 650000);
// console.log(ticketManager.getEvents());
ticketManager.addUser(1, 'Diego')
ticketManager.addUser(1, 'Paola')
ticketManager.addUser(1, 'Paola')
ticketManager.addUser(4, 'Paola')
ticketManager.eventTour(2, 'Corrientes', new Date('2024-10-10T00:02:08.454Z'))
console.log(ticketManager.getEvents());


