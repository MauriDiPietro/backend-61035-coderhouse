import { faker } from '@faker-js/faker';
faker.locale = 'es'

export const generateUser = () => {
    return {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        image: faker.image.avatar()
    }
}
