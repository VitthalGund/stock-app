import { useEffect, useState } from "react"
import Stock from "./Stock"
import { stock } from "../types/stock"
import axios from "../api/axios";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

const StockTable = () => {
    const [stock, setStock] = useState<stock[]>();
    const [number, setNumber] = useState<number>(0);
    const [num, setNum] = useState<number>(0);
    const [clicked, setClicked] = useState<boolean>(false)
    const abort = new AbortController()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const assigndata = (resp: AxiosResponse<any, any>) => {
        const data: stock[] = resp.data.map((data: stock) => {
            return {
                T: data.T,
                c: data.c,
                h: data.h,
                l: data.l,
                n: data.n,
                o: data.o,
                t: data.t,
                v: data.v,
                vw: data.vw,
            }
        });
        setStock(data)
    }
    const getStocks = async () => {
        try {
            if (!number || number < 0 || number > 20) {
                toast.info("Enter value between 0 to 20")
                return;
            }
            setClicked(false)
            setNum(number);
            const resp = await toast.promise(axios.post(`/stocks/info`, {
                no: num
            }, { signal: abort.signal }), {
                pending: "geting your stock",
                success: "stock information fetech Successfully",
                error: "unable get stock information",
            });
            console.log(resp)
            assigndata(resp)
            setClicked(true)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        const id = setInterval(async () => {
            if (!number) {
                return;
            }
            if (!clicked) {
                return;
            }
            if (num === 0) {
                return;
            }

            try {
                const resp = await axios.post(`/stocks/info`, {
                    no: num
                })
                assigndata(resp);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.log(error.message)
            }
        }, 1000)

        if (!clicked) clearInterval(id);
    }, [clicked, number, num])


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="flex justify-center items-center p-4">
                        <h1 className="text-3xl text-black dark:text-white m-auto">Stock Listing</h1>
                    </div>
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <div className="relative w-full">
                                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter the Number"
                                            onChange={(e) => setNumber(Number(e.target.value))}
                                            required />
                                    </div>
                                    <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                        <button onClick={getStocks} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm lg:px-4 lg:py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                            Get Stocks
                                        </button>
                                    </button>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                                        <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                            <li className="flex items-center">
                                                <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="nikon" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="nikon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="benq" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="benq" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3" title="Name of Company">Stock name</th>
                                        <th scope="col" className="px-4 py-3" >start of the aggregate</th>
                                        <th scope="col" className="px-4 py-3" title="The close price for the symbol in the given time period.">Close Price</th>
                                        <th scope="col" className="px-4 py-3" title="The highest price for the symbol in the given time period.">Highest Price</th>
                                        <th scope="col" className="px-4 py-3" title="The lowest price for the symbol in the given time period.">Lowest Price</th>
                                        <th scope="col" className="px-4 py-3" title="The open price for the symbol in the given time period.">Open Price</th>
                                        <th scope="col" className="px-4 py-3" title="The trading volume of the symbol in the given time period.">Number of Transaction</th>
                                        <th scope="col" className="px-4 py-3" title="The volume weighted average price.">Volume Weighted Average Price</th>
                                        <th scope="col" className="px-4 py-3" title="The trading volume of the symbol in the given time period.">Volume of Trading</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stock?.map((item, indx) => {
                                        return <Stock
                                            T={item.T}
                                            c={item.c}
                                            h={item.h}
                                            l={item.l}
                                            n={item.n}
                                            o={item.o}
                                            t={item.t}
                                            v={item.v}
                                            vw={item.vw}
                                            key={indx}
                                        />
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default StockTable
