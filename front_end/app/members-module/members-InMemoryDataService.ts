import { InMemoryDbService } from 'angular-in-memory-web-api';
export class MembersInMemoryDataService implements InMemoryDbService {
    createDb() {
        let members = [
            { id: 1, name: 'Maman' },
            { id: 2, name: 'Papa' },
            { id: 3, name: 'Oussama' },
            { id: 4, name: 'Yasser' },
            { id: 5, name: 'Zakaria' },
            { id: 6, name: 'Imane' },
            { id: 7, name: 'Omayma' },
            { id: 8, name: 'Salma' }
        ];
        return { members };
    }
}
