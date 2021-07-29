import PropTypes from 'prop-types'

import './styles.css'

export function PostCard({ title, cover, body, id }) {
  return (
    <div key={id} className="post">
      <img src={cover} alt={title} />
      <div className="post-content">
        <h2>
          {title} {id}
        </h2>
        <p>{body}</p>
      </div>
    </div>
  )
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}
