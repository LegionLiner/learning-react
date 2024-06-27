export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
        );
        return response;
    }
}