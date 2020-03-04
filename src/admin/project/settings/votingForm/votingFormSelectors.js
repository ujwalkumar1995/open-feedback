import { getAdminStateSelector } from '../../../adminSelector'
import { createSelector } from 'reselect'
import { VOTE_TYPE_TEXT } from '../../../../core/contants'

const getVotingForm = state => getAdminStateSelector(state).adminVotingForm

export const getVoteItemsSelector = state => getVotingForm(state).voteItems
export const isSavingSelector = state => getVotingForm(state).ongoingSave
export const shouldConfirmSaveSelector = state =>
    getVotingForm(state).shouldConfirmSave

// MEMOIZED

export const getSortedVoteItemsSelector = createSelector(
    getVoteItemsSelector,
    voteItems =>
        voteItems.sort((a, b) => {
            if (a.type === VOTE_TYPE_TEXT) return 1
            return a.position > b.position ? 1 : -1
        })
)

export const getBooleanVoteItemsSelector = createSelector(
    getSortedVoteItemsSelector,
    voteItems => {
        return voteItems
            .filter(item => item.type === 'boolean')
            .sort((a, b) => a.position - b.position)
    }
)

export const getCommentVoteItemSelector = createSelector(
    getSortedVoteItemsSelector,
    voteItems => {
        return voteItems.filter(item => item.type === 'text')
    }
)
