import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'
import { usePracticesContext } from './usePracticesContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const { dispatch: practicesDispatch } = usePracticesContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
        practicesDispatch({type: 'SET_PRACTICES', payload: null})
    }

    return {logout}
}