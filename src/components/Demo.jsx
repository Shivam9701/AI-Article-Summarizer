import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {

    const [article, setArticle] = useState({
        url: '',
        summary: ''
    });

    const [allArticles, setAllArticles] = useState([]);

    const [copied, setCopied] = useState('')

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data } = await getSummary({ articleUrl: article.url })
        console.log(data)

        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary }
            const newAllArticles = [newArticle, ...allArticles]

            setArticle(newArticle)
            setAllArticles(newAllArticles)

            localStorage.setItem('articles', JSON.stringify(newAllArticles))
        }
    }

    const handleCopy = (url) => {

        setCopied(url);
        navigator.clipboard.writeText(url)
        setTimeout(() => {
            setCopied(false)
        }, 3000)

    }

    return (
        <section className='mt-16 w-full'>
            <div className='flex flex-col w-full gap-2'>
                <form className='relative flex justify-center items-center'
                    onSubmit={handleSubmit}>

                    <img src={linkIcon} alt='link' className='absolute left-0 my-2 ml-3 w-5' />

                    <input type='url' placeholder='Enter URL'
                        value={article.url}
                        onChange={(e) => { setArticle({ ...article, url: e.target.value }) }}
                        className='url_input peer' />

                    <button type='submit' className='submit_btn 
                         peer-focus:border-gray-700 peer-focus:text-orange-300'>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </button>
                </form>

                {/* //Browse History */}

                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.map((article, index) => {
                        return (
                            <div key={`link-${index}`}
                                onClick={() => { setArticle(article) }}
                                className='link_card'>

                                <div className='copy_btn' onClick={() => { handleCopy(article.url) }}>

                                    <img src={copied === article.url ? tick : copy} alt='copy-icon'
                                        className='w-2/5 h-2/5 object-contain' />

                                </div>
                                <p className='flex-1 font-satoshi
                                   text-blue-700 font-medium
                                   text-sm truncate'>{article.url}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* //Summary */}

            <div className='my-4 max-w-full flex justify-center items-center'>

                {isFetching ? <img src={loader} alt='loader' className='w-20 h-20 object-contain' />

                    : error ? (<p className='font-inter font-bold text-center text-black'>

                        Well that&apos;s embarrasing. Wasn&apos;t supposed to happen
                        <br />
                        <span className='font-satoshi font-normal text-gray-700'>
                            {error?.data?.error}
                        </span></p>)

                        : (article.summary &&
                            <div className='flex flex-col gap-3'>

                                <h2 className='font-satoshi font-bold text-gray text-xl'>
                                    Article <span className='blue_gradient'>Summary</span></h2>

                                <div>
                                    <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
                                </div>
                            </div>)
                }

            </div>
        </section>
    )
}

export default Demo