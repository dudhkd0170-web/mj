import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "서버에 OPENAI_API_KEY 환경변수가 설정되지 않았습니다. API 키를 확인해 주세요." },
        { status: 500 }
      );
    }

    const systemPrompt = {
      role: "system",
      content: `당신은 친절하고 이해심이 깊으며 설명 능력이 뛰어난 에듀빌더(EduBuilder)의 학생 전용 AI 튜터 '에듀봇(EduBot)'입니다.
학생들이 질문하는 다양한 분야(수학, 과학, 언어, 역사 등)에 대해 친절하게 답해주세요.

답변 가이드라인:
1. **학생 맞춤형 어조**: 반갑고 따뜻한 존댓말(해요체)을 사용하고, 학생을 격려해 주세요. 적절한 이모지를 풍부하게 사용하여 친근감을 주세요.
2. **단계별 학습 (Step-by-Step)**: 정답만 바로 알려주기보다는, 학생이 원리를 이해할 수 있도록 쉽게 풀어서 단계별로 설명해 주세요.
3. **구체적인 시각화 및 예시**: 추상적인 개념은 실생활의 예시나 시각적인 비유를 활용해 주세요. (예: 원기둥은 회전판 위의 직사각형이 돌아서 만들어진 동그란 캔 음료수 모양이야!)
4. **마크다운 활용**: 중요한 키워드는 **굵게** 강조하고, 번호 매기기나 글머리 기호를 사용하여 가독성을 극대화해 주세요.
5. **안전성**: 학생이 공격적이거나 부적절한 단어를 사용하면, 따뜻하지만 단호하게 다독이며 올바른 대화로 이끌어 주세요.`
    };

    // Prepend system prompt to the messages list
    const requestMessages = [systemPrompt, ...messages];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: requestMessages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: `OpenAI API 호출 중 오류가 발생했습니다: ${errorData.error?.message || "알 수 없는 API 오류"}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "답변을 생성하지 못했습니다. 다시 시도해 주세요.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: `서버 오류가 발생했습니다: ${error.message}` },
      { status: 500 }
    );
  }
}
