export type RootStackParamList = {
  index: undefined;
  Home: undefined;
  Details: undefined;
  Crear: undefined;
  Listar: undefined;
  Eliminar: undefined;
  Actualizar: undefined;
  Formulario: { student?: any; onSave: () => Promise<void> };
  IndexTest: undefined;  // Nueva ruta para el Index de prueba
  FormularioTest: undefined; // Nueva ruta para el Formulario de prueba
};
