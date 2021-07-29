import { useCallback, useEffect, useState } from 'react'

import { loadPosts } from '../../utils/load-posts'

import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button'
import { SearchInput } from '../../components/SearchInput'

import './styles.css'

export function Home() {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts()

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)
  }

  const handleChange = (event) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const noMorePosts = page + postsPerPage >= allPosts.length

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
      })
    : posts

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>Search value: {searchValue}</h1>
          </>
        )}

        <SearchInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não existem posts com esse nome</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            disabled={noMorePosts}
            onClick={loadMorePosts}
            text={'Load more posts'}
          />
        )}
      </div>
    </section>
  )
}
