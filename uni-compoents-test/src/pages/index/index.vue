<template>
	<view class="content">
		<money-input :pre="'￥'" :placeholder="'请输入'" :edit="moneyInputEdit" :value.sync="moneyInputValue" :focus.sync="moneyInputFocus"></money-input>
		{{ moneyInputValue }}
	</view>
</template>

<script>
import moneyInput from '../../compoents/money-input.vue';
	export default {
		components: {
			moneyInput
		},
		data() {
			return {
				// moneyInputEdit: false,
				moneyInputEdit: true,
				moneyInputFocus: true,
				moneyInputValue: '',
			}
		},
		watch:{
			moneyInputValue(value){
				console.log('moneyInputValue',value);
			},
			// moneyInputFocus(value){
			// 	console.log('moneyInputFocus',value);
			// },
		},
		onLoad() {
			// this.moneyInputValue = 0
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
