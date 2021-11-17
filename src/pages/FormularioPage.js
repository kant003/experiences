import { saveExperience } from "../services/firestore";
import { useForm } from "react-hook-form";




function FormularioPage() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const onSubmit = async data => {
    console.log('datos', data);
    await saveExperience(data)
    reset();
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
    <h1 className="title">Añade una nueva experiencia</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <div className="field">
        <label className="label">Titulo</label>
        <div className="control">
          <input {...register("title", { required: true })} className="input" name="title" placeholder="Pon un título a tu experiencia" />
        </div>
        {errors.title && <span className="help is-danger">Titulo obligatorio</span>}
      </div>

      <div className="field">
        <label className="label">Tipo de operación</label>
        <div className="control">
          <div className="select">
            <select name="type" {...register("type")}>
              <option>Aparato cirtulatorio</option>
              <option>Aparato respiratorio</option>
              <option>Aparato excretor</option>
              <option>....</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Cuéntanos tu experiencia</label>
        <div className="control">
          <textarea className="textarea" {...register("text")} name="text" placeholder="Textarea"></textarea>
        </div>
      </div>

      <div className="field">
        <label className="label">Aceptas los terminos y condiciones</label>

        <div className="control">
          <label className="radio">
            <input type="radio" name="question" {...register("aceptConditions")} />
            Yes
          </label>
          <label className="radio">
            <input type="radio" name="question" />
            No
          </label>
        </div>
      </div>

      <div className="field is-grouped is-grouped-multiline">
      <label className="label">Tags</label>

        

        <div className="control">
          <div className="tags has-addons">
          <span class="tag is-success"> Huesos
            <button class="delete is-small"></button>
          </span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
          <span class="tag is-success"> Dolor
            <button class="delete is-small"></button>
          </span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
          <span class="tag is-success"> Anestesia
            <button class="delete is-small"></button>
          </span>
          </div>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link" >Enviar</button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={() => reset()} >Cancelar</button>
        </div>
      </div>

    </form>
    </>
  );
}

export default FormularioPage;