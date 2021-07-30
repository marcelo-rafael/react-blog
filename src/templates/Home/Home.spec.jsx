import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { Home } from '.'

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg'
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2.jpg'
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg'
        },
        {
          userId: 4,
          id: 4,
          title: 'title4',
          body: 'body4',
          url: 'img4.jpg'
        },
        {
          userId: 5,
          id: 5,
          title: 'title5',
          body: 'body5',
          url: 'img5.jpg'
        },
        {
          userId: 6,
          id: 6,
          title: 'title6',
          body: 'body6',
          url: 'img6.jpg'
        },
        {
          userId: 7,
          id: 7,
          title: 'title7',
          body: 'body7',
          url: 'img7.jpg'
        },
        {
          userId: 8,
          id: 8,
          title: 'title8',
          body: 'body8',
          url: 'img8.jpg'
        },
        {
          userId: 9,
          id: 9,
          title: 'title9',
          body: 'body9',
          url: 'img9.jpg'
        },
        {
          userId: 10,
          id: 10,
          title: 'title10',
          body: 'body10',
          url: 'img10.jpg'
        }
      ])
    )
  })
]

const server = setupServer(...handlers)

describe('<Home />', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => {
    server.close()
  })

  it('should render search, posts and load more', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts com esse nome')

    expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/type your search/i)
    expect(search).toBeInTheDocument()

    const images = screen.getAllByRole('img', { name: /title/i })
    expect(images).toHaveLength(10)

    const button = screen.getByRole('button', { name: /load more posts/i })
    expect(button).toBeInTheDocument()
  })
})
