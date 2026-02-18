export async function GET() {
    const city = "Dublin,IE"
    const apiKey = process.env.NEXT_PUBLIC_OWM_API_KEY

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
`


    try {
        const response = await fetch(url)
        if (!response.ok){
            return new Response(JSON.stringify({error: "failed to fetch weather"}), {status: response.status})
        }

        const data = await response.json()
        return new Response(JSON.stringify(data), {status: 200})
    } catch (err){
        console.error("console error:", err)
        return new Response(JSON.stringify({error: err.message}), {status: 500})
    }

}