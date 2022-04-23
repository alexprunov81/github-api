import './scss/index.scss'
import {AppTemplate} from '@/components/AppTemplate'
import {SearchInput} from '@/components/SearchInput'

const container = new AppTemplate('app')
new SearchInput(container)
container.render()

