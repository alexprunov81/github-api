import './scss/index.scss'
import {AppTemplate} from '@/components/AppTemplate'
import {SearchInput} from "@/components/SearchInput";
import {SelectedResult} from "@/components/SelectedResult";

const container = new AppTemplate('app')
new SearchInput(container)
new SelectedResult(container)
container.render()

