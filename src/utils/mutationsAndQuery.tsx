import { gql } from '@apollo/client';

export const insert_tags_one = gql`
    mutation insert_tags_one($name: String!) {
		insert_tags_one(object: {name: $name}){
			created_at
			id
			name
			updated_at
		}
    }
`;

export const insert_tasks_one = gql
`
  mutation insert_tasks_one($title: String, $start_time: timestamptz, $end_time: timestamptz, $tag_id: Int) {
		insert_tasks_one(object: {title: $title, start_time: $start_time, end_time: $end_time, task_tags: {data: {tag_id: $tag_id}}}) {
			created_at
			end_time
			id
			start_time
			title
			updated_at
		}
  }
`

export const delete_tasks = gql`
	mutation delete_tasks($id: Int) {
		delete_tasks(where: {id : {_eq: $id}}) {
			affected_rows
		}
	}
`

export const update_task = gql`
	mutation update_tasks_by_pk($id: Int!, $title: String!, $start_time: timestamptz, $end_time: timestamptz){
		update_tasks_by_pk(_set: {title: $title, start_time: $start_time, end_time: $end_time}, pk_columns: {id: $id}) {
			created_at
			id
			updated_at
		}
	}
`

export const update_tag = gql`
	mutation update_task_tag_by_pk($task_id_to_update: Int!, $current_tag_id: Int!, $new_tag_id: Int) {
		update_task_tag_by_pk( _set: {tag_id: $new_tag_id }, pk_columns: {task_id: $task_id_to_update, tag_id: $current_tag_id}){
			tag_id
			task_id
		}
	}
`

export const delete_tag = gql`
	mutation delete_tags_by_pk($tag_id: Int!) {
		delete_tags_by_pk(id: $tag_id){
			created_at
			id
			name
			updated_at
		}
	}
`
export const tags = gql
`
    query tags {
        tags {
			id
			name
        }
      }
`;

export const get_tasks = gql
`
query{
	tasks(order_by: {created_at: asc}) {
	  created_at
	  end_time
	  id
	  start_time
	  tags {id, name}
	  title
	  updated_at
	}
}
`

export const filter_task = gql`
query($title: String, $start_time: timestamptz, $end_time: timestamptz, $tag_id: Int) {
	tasks(
			where: { _and: [
				{ title: {_eq: $title}},
				{ start_time: {_eq: $start_time} },
				{ end_time: {_eq: $end_time} },
				{ tags: {id: {_eq: $tag_id}} }
			]}
		) {
			created_at
			end_time
			id
			start_time
			tags {id, name}
			title
			updated_at
	}
}
`