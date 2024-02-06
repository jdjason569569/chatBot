import BotWhatsapp from "@bot-whatsapp/bot";
import { ChatCompletionMessageParam } from "openai/resources";
import { run } from "src/services/openai";
//import chatbotFlow from './chatbot.flow';

/**
 * Un flujo conversacion que es por defecto cuando  no se tenga palabras claves en otros flujos
 */
export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
  //addAction: para devolver algo dinamico.
  //state: estado entre el bot y la persona que escribe
  //flowDynamic: unafuncion para enviar a whatsapp
  .addAction(async (ctx, { state, flowDynamic }) => {
    try {
      const newHistory = (state.getMyState()?.history ??
        []) as ChatCompletionMessageParam[];
      const name = ctx.pushName ?? "";

      //history del usuario
      newHistory.push({
        role: "user",
        content: ctx.body,
      });
      const ai = await run(name, newHistory);
      await flowDynamic(ai);


      //history del mensaje saliente de la ia
      newHistory.push({
        role: "assistant",
        content: ai,
      });
      await state.update({history: newHistory});  // actualiza el history de la conversacion

      console.log("History ", newHistory);



    } catch (err) {
      console.log(`[ERROR]:`, err);
      return;
    }
  });
