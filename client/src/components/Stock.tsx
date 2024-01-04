import { stock } from "../types/stock"

const Stock = ({ T, n, c, h, l, o, v, vw, t }: stock) => {
    return (
        <>
            <tr className="border-b dark:border-gray-700">
                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{T}</th>
                <td className="px-4 py-3">{t}</td>
                <td className="px-4 py-3">{c}</td>
                <td className="px-4 py-3">{h}</td>
                <td className="px-4 py-3">{l}</td>
                <td className="px-4 py-3">{o}</td>
                <td className="px-4 py-3">{n}</td>
                <td className="px-4 py-3">{v}</td>
                <td className="px-4 py-3">{vw}</td>
            </tr>
        </>
    )
}

export default Stock
