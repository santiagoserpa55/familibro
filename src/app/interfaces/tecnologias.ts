export class Contrato {
	constructor(
		public nit: string,
		public razonSocial: string,
		public numContrato: string,
		public estado: string,
		public departamento: string,
		public tipoContrato: string,
		public codTarifa: string,
		public codPropio: string,
		public descTarifa: string,
		public valor: string
	) { }

}
