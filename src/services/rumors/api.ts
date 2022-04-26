export async function getRumors() {
    const res = await fetch('http://api.tianapi.com/txapi/rumour/index?key=da7a4ccc481b8943b0f26361a2d6fd30')
    return await res.json()
}