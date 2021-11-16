const apiKey = '7K8lUEArsAy7EAbY98Sumo3LxFpr12nf'

export default function getGifs(keyword = 'ball') {
    const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=10&offset=0&rating=g&lang=en`
    return fetch(apiURL)
        .then(r => r.json())
        .then(r => {
            const gifs = r.data.map(g => {
                const { images, title, id } = g
                const { url } = images.downsized_medium
                return { title, id, url }
            })
            return gifs
        })
}