import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getConferences, conferenceSelector } from '../../ducks/conferences'
import Loading from '../common/loading'

function ConferencesList(props) {
  const {
    getConferences,
    conferences: { loading, entities }
  } = props

  useEffect(() => {
    getConferences()
  }, [])

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        entities.map(
          ({ title, url, where, when, month, submissionDeadline }) => (
            <div key={`${title} ${url} ${where} ${when}`}>
              <h3>
                <a href={url}>{title}</a>
              </h3>
              <p>Where: {where}</p>
              <p>when: {when}</p>
              <p>
                Submission dead line:{' '}
                {submissionDeadline || `doesn't have dead line`}
              </p>
              <hr />
            </div>
          )
        )
      )}
    </div>
  )
}

export default connect(
  (state) => ({
    conferences: conferenceSelector(state)
  }),
  { getConferences }
)(ConferencesList)
