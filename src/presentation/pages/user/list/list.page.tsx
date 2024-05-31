import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserListView from "./listView.page";
import { UserListFilterInOrder, UserListFilterInSearch } from "./listFilter.page";
import { loadingTableSelector, loadingTableUpdateAction, loadingUpdateAction, msgUpdateAction } from "@redux/configuration";
import { UserEntity } from "@entity";
import { UserServiceImpl } from "@usecases";
import { UserRepositoryImpl } from "@repository";
import { ErrorCatchHttpInMsg } from "@utils";
import { updateUsersAction, usersSelector } from "@redux/user";

const UserListPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loadingTable = useSelector(loadingTableSelector)
    const usersStore = useSelector(usersSelector)

    const [users, setUsers] = React.useState<UserEntity[]>([])
    const [filter, setFilter] = React.useState<{ search: string, order: string }>({ search: "", order: "name" })

    const userService = new UserServiceImpl(new UserRepositoryImpl())

    React.useEffect(() => {
        loadUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadUsers = () => {
        loadingTableUpdateAction(dispatch, { status: true });
        userService.all().then(value => {
            updateUsersAction(dispatch, value)
            loadingTableUpdateAction(dispatch, { status: false });
        }).catch(e => {
            loadingTableUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    React.useEffect(() => {
        filterData(filter.search, filter.order)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersStore])

    const updateEnabled = (user: UserEntity) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.update_date', status: true })
        userService.updateEnabledById(user.id).then(_ => {
            loadUsers()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_update_success'], icon: 'success' })
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    const filterData = (search: string, order: string) => {
        let usersValue: UserEntity[] = UserListFilterInSearch(search, usersStore)
        usersValue = UserListFilterInOrder(order, usersValue)
        setFilter({ ...filter, search: search, order: order })
        setUsers(usersValue)
    }

    const deleteById = (id: number) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        userService.deleteById(id).then(_ => {
            loadUsers()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    const deleteByIds = (ids: number[], callbackSuccess: () => void) => {
        loadingUpdateAction(dispatch, { title: 'message.processing.delete_date', status: true })
        userService.deleteByIds(ids).then(_ => {
            loadUsers()
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ['message.alert.register_delete_success'], icon: 'success' })
            callbackSuccess()
        }).catch(e => {
            loadingUpdateAction(dispatch, { status: false });
            msgUpdateAction(dispatch, { msgs: ErrorCatchHttpInMsg(e), icon: "error" });
        })
    }

    return <UserListView
        orderMain={filter.order}
        loadingTable={loadingTable} users={users} refreshList={() => loadUsers()}
        filterList={(search, order) => filterData(search, order)}
        clickNewRegister={() => navigate("/user/new")}
        showUser={(userId) => navigate(`/user/${userId}`)}
        clickUpdateEnabled={(user) => updateEnabled(user)}
        clickDeleteById={(userId) => deleteById(userId)}
        clickDeleteByIds={(userIds, callbackSuccess) => deleteByIds(userIds, callbackSuccess)} />
}

export default UserListPage