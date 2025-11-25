![](https://cloud.overment.com/S01E01-1730570331.png)
## Interakcja z dużym modelem językowym
Zdolność dużych modeli językowych do generowania ustrukturyzowanych treści umożliwia ich integrację z logiką aplikacji, co pozwala programistycznie sterować ich zachowaniem. Na obecnym etapie rozwoju pełnią rolę narzędzia, które umożliwia przetwarzanie i generowanie danych w sposób dotąd niemożliwy do osiągnięcia programistycznie (np. z pomocą wyrażeń regularnych).

W AI\_devs 3 skupimy się na programistycznej interakcji z dużymi modelami językowymi poprzez API, budując częściowo-autonomiczne narzędzia zwane "Agentami AI". To złożone rozwiązania wymagające praktycznego doświadczenia w programowaniu i dobrego zrozumienia natury dużych modeli językowych.

Narzędzia te mogą realizować najróżniejsze zadania i procesy, ale nie są uniwersalne. Dlatego **skupimy się na tworzeniu ich indywidualnych komponentów oraz modułów.** W ten sposób możliwe będzie ich połączenie w różnych konfiguracjach i dopasowanie do naszych potrzeb.

Jeszcze kilkanaście miesięcy temu wybór modelu ogólnego zastosowania praktycznie zaczynał się i kończył na OpenAI. Natomiast dziś pod uwagę możemy brać:

- OpenAI: Modele z rodziny o1, GPT, w tym także TTS, Whisper i Embedding
- Anthropic: Modele z rodziny Claude (tylko tekst + obraz)
- Vertex AI (Google): Modele Gemini oraz wybranych dostawców (np. Anthropic) i inne
- [xAI](https://accounts.x.ai): Modele Grok, które dość szybko przebiły się na szczyty rankingów (top10).
- Amazon Bedrock (Amazon): Modele Anthropic, Mistral czy Meta i inne
- Azure (Microsoft): Modele OpenAI, Meta i inne
- Groq: Modele Open Source, np. Llama
- a także kilka innych, np.: OpenRouter, Perplexity, Cerebras, Databricks, Mistral AI czy Together AI

Możemy zatem wybierać między różnymi ofertami cenowymi, limitami dostępu do API, polityką prywatności i przetwarzania danych, a także samymi modelami. Jest to istotne, ponieważ agenci AI będą autonomicznie korzystać z naszych baz wiedzy lub uzyskają dostęp do narzędzi. Przełoży się to na działanie na dość dużej skali, uwzględniającej przetwarzanie nawet dziesiątek milionów tokenów, co generuje zauważalne koszty. Obrazuje to poniższy przykład zapytania z prośbą do Agenta AI o zapisanie zadań w [Linear](https://linear.app/), co przełożyło się na 17,400 tokenów zapytania (input) i 461 tokenów odpowiedzi (output). Warto też zwrócić uwagę na czas wykonania zapytania, czyli "aż" 24 sekundy.

![Przykład zapytania do Agenta AI z prośbą o zarządzanie zadaniami obrazuje skalę przetwarzanych tokenów oraz czasu reakcji](https://cloud.overment.com/2024-09-02/aidevs3_usage-c1dee228-3.png)

**Jedna wiadomość, kilka podjętych działań, niemal 18 tysięcy tokenów i pół minuty na reakcję** — z boku brzmi to, jak rozwiązanie, które nie ma sensu. Spójrzmy jednak na nie z nieco innej perspektywy.

Zarządzanie zadaniami **wymaga aktywnego działania ze strony osoby** obsługującej urządzenie z aplikacją taką jak Linear, Todoist czy ClickUp. Zadanie musi zostać nazwane, opisane, przypisane do kategorii, daty, priorytetu czy projektu **— w ten sposób pracuje większość z nas.**

![Obsługa aplikacji niemal zawsze wymaga bezpośredniego zaangażowania człowieka, który kontroluje cały proces](https://cloud.overment.com/2024-09-02/aidevs3_human-1e0045b9-1.png)

Proces ten można częściowo zautomatyzować. Przykładowo, możemy za pomocą API monitorować skrzynkę e-mail oraz pojawiające się słowa kluczowe. Na ich podstawie możliwe jest ustawienie reguł przekierowujących wiadomość do wskazanej osoby lub nawet utworzenie nowego wpisu w aplikacji do zadań. **Tutaj zaangażowanie człowieka nie jest wymagane, lecz potrzebny jest zestaw programistycznie zdefiniowanych zasad (co nie zawsze jest możliwe)** — mówimy więc tutaj o automatyzacji procesu według ściśle określonych reguł.

![Procesy prywatne i biznesowe mogą być automatyzowane według sztywnych reguł, np. dopasowania słów kluczowych](https://cloud.overment.com/2024-09-02/aidevs3_email-641f6178-2.png)

Teraz do budowy takiego systemu możemy wykorzystać duże modele językowe. Dzięki nim możemy przyjmować różne formy treści pochodzące z różnych źródeł, ponieważ za ich interpretację oraz podejmowane działania odpowiada model połączony z logiką aplikacji.

Taki system może otrzymywać dane w formie zwykłych wiadomości pochodzących od innej osoby, a także poprzez zdjęcia z telefonu, nagrania głosowe z zegarka czy wiadomości przesłane na laptopie lub z zewnętrznego API. Co więcej, źródłem danych może być nawet **inny agent AI!**

W poniższym schemacie widzimy, że wszystkie źródła danych generują **zapytanie**, które jest interpretowane przez duży model językowy, na podstawie którego generowany jest plan działań i podejmowane są akcje.

![Automatyzacja w połączeniu z dużym modelem językowym pozwala na dość swobodne transformowanie różnych formatów treści, a także dynamiczne dostosowanie się do sytuacji](https://cloud.overment.com/2024-09-02/aidevs_agent-e32d845c-6.png)

Szczególnie interesujący jest tutaj fakt, że podczas realizowania powyższej logiki, możliwe jest dynamiczne uzyskiwanie dostępu do informacji. Np. na podstawie wspomnianej nazwy projektu agent może wczytać dodatkowe informacje na jego temat, lub pobrać dane z Internetu, aby wzbogacić opis. Z kolei w sytuacji, gdy nie będzie w stanie sobie poradzić z zadaniem ... może poprosić człowieka o pomoc.

<div style=padding:75% 0 0 0;position:relative;><iframe allow=autoplay; fullscreen; picture-in-picture; clipboard-write frameborder=0 src=https://player.vimeo.com/video/1005763540?badge=0&autopause=0&player\_id=0&app\_id=58479 style=position:absolute;top:0;left:0;width:100%;height:100%; title=0101\_intro></iframe></div><script src=https://player.vimeo.com/api/player.js></script>

No i właśnie budowaniem takich rozwiązań, będziemy zajmować się przez najbliższe tygodnie, zatem — witaj w AI\_devs 3!
## Połączenie z modelem, od praktycznej strony
Na tym etapie zakładam, że materiały wdrożeniowe do AI\_devs 3 masz już za sobą lub wracasz do nas z poprzednich edycji. W obu przypadkach posiadasz przynajmniej bazową wiedzę na temat modeli językowych. Możemy więc przejść do praktycznych przykładów interakcji z modelami.

Zacznijmy od tego, że domyślnie interakcja z modelem polega na budowaniu tablicy `messages` zawierającej treść konwersacji połączoną z instrukcją systemową, czyli format ChatML. Jednak nas interesuje kilka dodatkowych kwestii.

Mianowicie fakt, że na wygenerowanie rezultatu w przypadku Agenta AI składa się wiele zapytań i wywołań funkcji. W przykładzie poniżej widzimy 4 etapy:

- **Zrozumienie:** Wymaga wczytania pamięci i/lub dostępu do Internetu. W ten sposób wykraczamy poza bazową wiedzę modelu i zyskujemy informacje przydatne na dalszych etapach. Można to określić jako etap "zastanawiania się" lub "analizy".
- **Plan działań**: Wymaga połączenia wcześniejszych "przemyśleń" połączonych z listą dostępnych narzędzi, umiejętności lub innych agentów. Na tej podstawie tworzona jest lista akcji, która ma być zrealizowana w dalszych krokach.
- **Podejmowanie działań**: Wymaga wiedzy, planu i dostępnych umiejętności, na podstawie których model decyduje o kolejnym kroku i gromadzi informacje zwrotne.
- **Odpowiedź**: Wymaga wiedzy oraz raportu z działań w celu wygenerowania ostatecznej odpowiedzi.

![](https://cloud.overment.com/2024-09-02/aidevs3_plan-f0b12e52-d.png)

Już na tym etapie trzeba mieć na uwadze to, że powyższa interakcja, **nie musi uwzględniać zaangażowania ze strony człowieka** i może być realizowana "w tle" oraz trwać od kilku sekund do nawet kilku godzin. Może też być uruchamiana automatycznie według harmonogramu lub zewnętrznego zdarzenia.

Widzimy też wyraźnie, że nie mówimy tutaj już o prostym budowaniu konwersacji przez tablicę `messages`, lecz nowej architekturze i wzorcach projektowania aplikacji. Co ciekawe, jest to programowanie które w ~80% przypomina klasyczne aplikacje, a LLM, Prompty czy narzędzia takie jak bazy wektorowe stanowią jedynie pewną część. Natomiast poza samym kodowaniem, zdecydowanie większą rolę odgrywa praca z danymi, różnymi formatami plików, organizacją baz danych czy strategiami wyszukiwania (tzw. retrieval).

Wracając jednak do prowadzenia interakcji z modelem, to w przykładzie [`thread`](https://github.com/i-am-alice/3rd-devs/tree/main/thread) widzimy dość nietypowy, aczkolwiek bardzo przydatny sposób prowadzenia konwersacji. Zamiast każdorazowo przesyłać całą historię wiadomości do modelu, to stosujemy **podsumowanie** oraz jedynie **najnowszą wiadomość użytkownika**. Dzięki temu, nie potrzebujemy kompletnej konwersacji, aby model zapamiętał kluczowe informacje takie jak imię użytkownika.

Aby uruchomić ten przykład, włącz serwer poleceniem `bun thread` i wykonaj zapytanie GET na adres `localhost:3000/api/demo`.

![](https://cloud.overment.com/2024-09-02/aidevs3_thread-676ee978-b.png)

Schemat tej interakcji wygląda następująco: po udzieleniu pierwszej odpowiedzi generowane jest podsumowanie dotychczasowej rozmowy, które jest dołączane do promptu systemowego kolejnej tury. W ten sposób przekazujemy "skompresowany" wątek.

![](https://cloud.overment.com/2024-09-02/aidevs3_turns-faccf75e-d.png)

W wyniku takiej kompresji naturalnie tracimy część informacji. Nic jednak nie stoi na przeszkodzie, aby dodać mechanizm przeszukiwania wcześniejszych wątków na wypadek, gdyby podsumowanie było niewystarczające.

Przykład [`thread`](https://github.com/i-am-alice/3rd-devs/tree/main/thread) jest prosty, jednak doskonale obrazuje to, jak możemy manipulować przebiegiem konwersacji, a w rezultacie:

- Fakt, że do podsumowania zastosowaliśmy tańszy model, jest przykładem **optymalizacji kosztów**
- Dzięki podsumowaniu model przetwarza mniejszą ilość treści, **przez co jego uwaga jest bardziej skupiona na aktualnym zadaniu** — **WAŻNE!** w modelach klasy GPT-4o jest to bardzo istotna kwestia, wpływająca na skuteczność działania modelu
- Podsumowanie pozwala także uniknąć limitu okna kontekstu, co ma znaczenie w przypadku modeli Open Source, które mogą odpowiadać za wybrany element interakcji (np. anonimizację)
- Podsumowanie może być również wykorzystane w innych częściach logiki agenta, a także jako element interfejsu użytkownika lub raportu pracy agent
- W tym przypadku zastosowaliśmy podsumowanie, jednak ten sam schemat będziemy stosować np. przy rozpoznawaniu obrazu, dźwięku czy wideo. Tam również dodatkowe zapytania do modelu będą wykorzystywane jako kontekst promptu systemowego
## Rodzaje interakcji
Złożona logika agentów składa się z modułów oraz pojedynczych akcji. Trudno mówić o dobrze działającym systemie, jeśli nie zadbamy o detale zarówno po stronie promptów, jak i po stronie kodu. Dlatego na tym etapie przejdziemy przez kilka przykładów elementarnych akcji, takich jak podejmowanie decyzji, klasyfikacja, parsowanie, transformacja i ocena. Wykorzystamy także narzędzie PromptFoo, którego uruchomienie omówiłem w lekcji S00E02 — Prompt Engineering i o którym będziemy jeszcze mówić w dalszych lekcjach, a aktualnie wystarczy nam jego uruchomienie.

Przykładem pojedynczej akcji, może być **podejmowanie decyzji** przez model na podstawie dostępnych danych. Można to porównać do instrukcji warunkowej `if` lub `switch`. Różnica polega na elastyczności, kosztem deterministycznego rezultatu.

Poniższy scenariusz prezentuje logikę sprawdzającą czy do danego zapytania potrzebujemy skorzystać z wyszukiwarki internetowej. W pierwszej chwili taki scenariusz sugeruje zastosowanie Function Calling / Tool Use. Nie zawsze jednak będzie to oczywiste.

![](https://cloud.overment.com/2024-09-03/aidevs3_decision-a25871ac-c.png)

Mianowicie zakładamy tutaj, że natychmiast mamy komplet niezbędnych informacji potrzebnych do uruchomienia wyszukiwania, co zwykle nie jest prawdą. Połączenie np. z FireCrawl może wymagać pobrania listy dopuszczalnych domen, czy wygenerowania słów kluczowych na podstawie dodatkowego kontekstu wczytywanego z bazy danych.

W przykładzie [`use search`](https://github.com/i-am-alice/3rd-devs/tree/main/use_search) (wymaga zainstalowanego PromptFoo), mamy prompt odpowiadający za podejmowanie decyzji o zastosowaniu wyszukiwarki. Jego zadaniem jest wygenerowanie `0` lub `1` w celu klasyfikacji zapytania. Z tego powodu uwzględniłem w nim przykłady Few-Shot oraz zdefiniowałem zestaw zasad dopasowany do początkowych założeń. Następnie działanie takiego promptu jest automatycznie weryfikowane na kilkudziesięciu przykładach.

![](https://cloud.overment.com/2024-09-03/aidevs3_promptfoo-09e8b046-b.png)

Podejmowanie decyzji przez LLM może uwzględniać potrzebę wybrania wielu opcji, a nie tylko jednej. Wówczas mówimy o klasyfikacji zapytania. Skoro jesteśmy już przy przeszukiwaniu Internetu, to pomocny będzie także prompt wybierający domeny, do których zawęzimy wyszukiwanie. Jest to przydatne, ponieważ autonomiczne przeglądanie stron www szybko prowadzi do niskiej jakości źródeł czy serwisów, które wymagają logowania lub blokują dostęp do treści.

Warto więc wypisać sobie listę adresów i opisać je tak, aby LLM mógł zdecydować kiedy je uwzględnić, a kiedy nie. Prompt realizujący to zadanie znajduje się w przykładzie [`pick_domains`](https://github.com/i-am-alice/3rd-devs/tree/main/pick_domains).

![](https://cloud.overment.com/2024-09-03/aidevs3_domains-08f186d6-5.png)

W powyższym prompcie, w celu zwiększenia skuteczności, zastosowaliśmy także wariant Thought Generation, a konkretnie "zero-shot chain of thought". Mówimy tutaj o podniesieniu skuteczności, ponieważ w ten sposób dajemy LLM "czas na myślenie", które domyślnie widoczne jest w modelach `o1`. Dodatkowo fakt, że właściwość "\_thoughts" jest generowana na początku, jest powiązany z faktem, że modele językowe są obecnie autoregresyjne i treść tej pierwszej właściwości wpływa na treść kolejnych — zwiększając w ten sposób prawdopodobieństwo uzyskania oczekiwanych rezultatów.

Pozostając w temacie przeszukiwania Internetu, jesteśmy gotowi na wykonanie zapytania do wyszukiwarki. Jednak na tym etapie możemy uzyskać jedynie wyniki w formacie znanym z Google czy DuckDuckGo. Oznacza to, że nie będą to wystarczające informacje do udzielenia finalnej odpowiedzi, ale możemy na ich podstawie wskazać strony, które będziemy chcieli wczytać.

W przykładzie `rate` znajduje się prompt oceniający to, czy zwrócony wynik może zawierać interesujące nas informacje. Na podstawie zwróconych ocen wybierzemy te strony, których zawartość będziemy chcieli wczytać z pomocą np. FireCrawl.

![Automatyczny test promptu oceniającego to, jak istotny jest context z punktu widzenia zapytania](https://cloud.overment.com/2024-09-04/aidevs_rate-7364bbb1-3.png)

Zbierając to w całość, mamy już:

- Decyzję o tym czy wyszukiwarka internetu jest potrzebna
- Decyzję o tym, jakie zapytania chcemy do niej skierować
- Możliwość filtrowania zwróconych wyników

Pozostaje nam więc już tylko wygenerowanie odpowiedzi na oryginalne pytanie na podstawie pobranych danych. Zobaczmy, jak możemy to wszystko połączyć w całość w przykładzie [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch). Jego logika umożliwia zwykłą rozmowę z LLM, ale gdy wykryta zostanie konieczność skorzystania z wyszukiwarki, oryginalne zapytanie użytkownika zostaje wykorzystane do przeszukiwania sieci, co zresztą można zobaczyć na poniższym filmie.

<div style=padding:56.25% 0 0 0;position:relative;><iframe allow=autoplay; fullscreen; picture-in-picture; clipboard-write frameborder=0 src=https://player.vimeo.com/video/1006292055?badge=0&autopause=0&player\_id=0&app\_id=58479 style=position:absolute;top:0;left:0;width:100%;height:100%; title=01\_01\_websearch></iframe></div><script src=https://player.vimeo.com/api/player.js></script>

![Przykład kodu łączącego duży model z wyszukiwarką internetową](https://cloud.overment.com/2024-09-04/aidevs3_websearch-f14ad4e3-1.png)
## Architektura aplikacji
Patrząc nawet na przykład [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch), można zauważyć, że faktycznie ~80% kodu przypomina klasyczną aplikację. Jednak zgodnie z tym, co omawialiśmy w lekcji S00E04 — Programowanie, w kodzie zaczyna pojawiać się język naturalny oraz elementy, które do tej pory mogły odgrywać nieco mniejszą rolę w zależności od projektu.

Poza strukturą katalogów, podziałem odpowiedzialności, architekturą bazy danych czy samym stackiem technologicznym, pod uwagę musimy wziąć także rolę dużych modeli językowych oraz promptów. Nie chodzi tutaj wyłącznie o wybór modelu, hostingu czy napisaniu instrukcji, ale przede wszystkim o sposób przepływu danych.

Jeśli spojrzymy teraz na wizualizację przykładu [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch), to jasno widzimy, że działanie kolejnych promptów jest uzależnione od rezultatów poprzednich. Choć każdy z nich budujemy indywidualnie, to robiąc to, musimy brać pod uwagę dane na których będzie pracować, oraz to w jaki sposób generowane przez niego dane będą wykorzystane później.

![](https://cloud.overment.com/2024-09-04/aidevs3_graph-f6782902-9.png)

Nieco bardziej rozbudowana wizualizacja pokazuje te zależności nieco wyraźniej. I tak nie jest to wszystko, bo mamy tutaj do czynienia z łańcuchem promptów i akcjami następującymi po sobie, a nie zawsze tak będzie.

![](https://cloud.overment.com/2024-09-04/aidevs3_advanced-734782e6-2.png)

Na blogu LangChain można przeczytać [o podstawach architektury kognitywnej](https://blog.langchain.dev/what-is-a-cognitive-architecture/), gdzie uwzględniony jest podział na Code, LLM Call, Chain, Router, a także State Machine i w pełni autonomiczne systemy o których będziemy jeszcze mówić.

![](https://cloud.overment.com/2024-09-05/xnapper-2024-09-05-09.56.29-f389615d-4.png)

Tymczasem spróbujmy spojrzeć na to z szerokiej perspektywy, uwzględniając elementy, które w tej chwili pominęliśmy w celu uniknięcia dużej złożoności.

- **Baza danych (np. PostgreSQL):** teraz nie tylko historia konwersacji rozpoczyna się za każdym razem od nowa. Treść wyników wyszukiwania oraz zawartość wczytanych stron również znikają po zakończeniu żądania. Zatem jeśli w kolejnej wiadomości użytkownik zada pytanie pogłębiające, będziemy musieli ponownie wczytywać te same dane. Widzimy więc, że **będziemy chcieli zapisać zarówno historię rozmowy, jak i kontekst wykorzystany do ich generowania**. Ogólny mechanizm widoczny jest we wcześniejszym przykładzie [`thread`](https://github.com/i-am-alice/3rd-devs/tree/main/thread), ale uwzględniał on wyłącznie treść rozmowy, bez dodatkowego kontekstu
- **Silnik wyszukiwania (np. Qdrant):** zapisując wspomniane dane, szybko dojdziemy do momentu gdy wczytanie ich wszystkich do kontekstu stanie się nieopłacalne lub wprost niemożliwe. Wówczas kluczowe będzie ich skuteczne odszukiwanie. Musimy zatem pomyśleć o tym, jak je skutecznie zorganizować i opisać, a potem przeszukiwać oraz przekazywać do modelu.
- **Zarządzanie stanem**: podobnie jak w przypadku klasycznych aplikacji, tutaj także do gry wchodzi zarządzanie stanem. Jednak tutaj przechowywane dane będą obejmować historię promptów czy historię uruchomionych narzędzi wraz z informacją zwrotną.
- **API:** w przypadku [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch) mamy do czynienia tylko z dwoma narzędziami (web search i web scrapping), jednak zwykle będzie ich znacznie więcej. Każde z nich musi zostać zbudowane tak, aby LLM mógł się nim posługiwać, rozumieć odpowiedzi oraz obsługiwać błędy
- **Ewaluacja promptów**: Patrząc na powyższy schemat, staje się jasne, dlaczego wcześniej przechodziliśmy przez PromptFoo oraz dlaczego będziemy modyfikować prompty, testując je automatycznie na wybranych zestawach testowych.
- **Wersjonowanie i kopie zapasowe:** wersjonowanie odnosi się już nie tylko do historii kodu oraz promptów, lecz także do zmian wprowadzanych przez model. Przykładowo, agent zarządzający listą zadań może przypadkowo zmodyfikować wpisy, których nie chcemy edytować, i musimy mieć łatwy sposób ich przywrócenia.
- **Kontrola uprawnień**: w przykładzie [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch) programistycznie ograniczyłem listę domen z którymi LLM może się skontaktować. W podobny sposób będziemy określać uprawnienia modelu w celu zwiększenia stabilności aplikacji.
- **Monitorowanie aplikacji:** w przykładzie [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch) historię wykonanych zapytań zapisałem w pliku markdown. Naturalnie, nie będzie to wystarczające w produkcyjnych aplikacjach, gdzie będziemy korzystać z LangFuse czy podobnych rozwiązań do zaawansowanego monitorowania.
- **Asynchroniczność:** narzędzie [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch) pokazuje, że LLM może działać w tle, co wydłuża czas reakcji. W takim przypadku sensowne jest uruchamianie skryptu "w tle" lub utworzenie kolejki, po której wykonaniu użytkownik otrzyma powiadomienie lub e-mail z informacją o zakończeniu zadania.
- **Interfejs:** narzędzie [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch) może być wykorzystane w interfejsie czatu, co pokazałem na filmie. Jednak równie dobrze mógłby to być formularz umożliwiający dodanie listy adresów oraz związane z nimi zadania (np. "pobierz najnowszy artykuł") wraz z harmonogramem uruchomienia.

Wszystkimi z wyżej wymienionych punktów będziemy zajmować się w dalszych lekcjach, ale nie wszystkie będą wymagane za każdym razem. Będziemy tworzyć zarówno proste narzędzia odpowiedzialne za nieskomplikowane akcje, jak i rozbudowane rozwiązania wspierające złożone procesy.
## Optymalizacja skuteczności
Instrukcje z przykładów [`pick_domains`](https://github.com/i-am-alice/3rd-devs/tree/main/pick_domains), [`use_search`](https://github.com/i-am-alice/3rd-devs/tree/main/use_search) czy [`rate`](https://github.com/i-am-alice/3rd-devs/tree/main/rate) zawierają od kilku do kilkunastu przykładów Few-Shot. W niektórych przypadkach może być ich nawet kilkadziesiąt czy kilkaset i wówczas mówimy o "in-context learningu w oparciu o przykłady 'many-shot'" o których możemy przeczytać w [Many-Shot In Context Learning](https://arxiv.org/abs/2404.11018).

![](https://cloud.overment.com/2024-09-05/aidevs3_manyshot-4edd19f3-b.png)

Uwzględnienie przykładów jest pierwszą techniką, którą powinniśmy brać pod uwagę przy optymalizacji skuteczności promptu. Poprzez prezentowanie oczekiwanego zachowania w ten sposób, możemy wzmocnić treść głównej instrukcji.

Samym projektowaniem przykładów będziemy zajmować się w dalszych lekcjach, natomiast na teraz musisz wiedzieć, że:

- Przykłady zwykle mają formę par prezentujących dane wejściowe (wiadomość użytkownika) oraz dane wyjściowe (odpowiedź modelu)
- Liczba przykładów zwykle nie przekracza ~3 - 40 par
- Przykłady powinny prezentować oczekiwane zachowanie i być zróżnicowane oraz uwzględniać sytuacje brzegowe (np. takie w których zachowanie modelu ma być inne niż oczekiwane)
- Przykłady muszą być dobrane starannie, lecz do ich generowania możemy wykorzystać pomoc ze strony modelu
- Przykłady docelowo mogą być wykorzystane na potrzeby Fine-Tuning, a ich warianty na potrzeby automatycznych testów
- Duża liczba przykładów może być połączona [z mechanizmem cache'owania](https://www.anthropic.com/news/prompt-caching) w celu optymalizacji kosztów oraz wydajności

Technikami dobierania przykładów i pracy z nimi, będziemy zajmować się w dalszej części AI\_devs 3. Tymczasem Few-Shot możesz zapamiętać jako nieodłączny element praktycznie każdego promptu.
## Podstawy pamięci długoterminowej
Wczytywanie treści z wyszukiwarki oraz stron www do promptu w celu odpowiadania na pytania na ich podstawie to przykład Retrieval-Augmented Generation. Tutaj z pomocą FireCrawl rozszerzyliśmy bazową wiedzę modelu dokładnie w taki sposób, jak będziemy robić to w przypadku baz wiedzy czy pamięci tymczasowej oraz długoterminowej agenta. Jest to prawdopodobnie znany Ci już schemat, widoczny poniżej, w którym wskazujemy modelowi treść, którą ma wykorzystać przy generowaniu odpowiedzi.

![](https://cloud.overment.com/2024-09-05/aidevs3_rag-1d9ef809-b.png)

Analogicznie będziemy wczytywać dane z plików, baz danych czy zewnętrznych usług. Przykład [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch) pokazał nam jednak, że na odszukanie informacji będzie składać się szereg dodatkowych kroków, związanych z parafrazą zapytania, generowaniem dodatkowych zapytań (tzw. Self-Querying), ocenianiem wyników (tzw. Re-rank) i ich filtrowaniem.

Należy mieć tutaj na uwadze fakt, że podłączanie zewnętrznych źródeł wiedzy do naszego systemu może mieć bardzo negatywny wpływ na jego działanie. To właśnie z tego powodu ograniczyłem listę domen dla FireCrawl, ale takich sytuacji jest więcej. Chociażby wczytywanie dokumentu PDF może wiązać się z utratą formatowania, co zaburzy zrozumienie jego zawartości.

Problemy z formatowaniem to także nie wszystko, ponieważ stale musimy mieć na uwadze ograniczoną wiedzę LLM na temat naszego kontekstu. Przykładowo jeśli powiemy "Zapamiętaj, że overment to mój nickname", to system powinien zapamiętać "Nickname Adama to overment". W przeciwnym razie w przyszłości może uznać, że 'overment' to jego nickname, czego przykład mamy poniżej.

![](https://cloud.overment.com/2024-09-05/aidevs3_nickname-b04b7bd3-c.png)

O pamięci długoterminowej dla modelu będziemy jeszcze mówić w module trzecim AI\_devs 3. Na ten moment zapamiętaj, że:

- Jakość wypowiedzi modelu zależy od promptu, ale także od dostarczonych danych
- Instrukcja powinna zawierać informacje na temat tego, jak model powinien wykorzystywać kontekst w swoich wypowiedziach
- Jeden prompt może zawierać wiele zewnętrznych kontekstów, jednak powinny być one wyraźnie od siebie oddzielone
- Model powinien posiadać instrukcję u zachowaniu w sytuacji, gdy dostarczony kontekst jest niewystarczający do udzielenia odpowiedzi
- Musimy zadbać nie tylko o jakość źródeł dostarczanych informacji, ale także o sposób ich przechowania i dostarczenia do modelu. Wspomniana wyżej parafraza wspomnienia pokazuje, że zawsze musimy zadawać sobie pytanie: **Jak model będzie wykorzystywać dostarczoną wiedzę?**
## Podsumowanie
Niniejsza lekcja to przedsmak tego, czym będziemy zajmować się w nadchodzących tygodniach. Jej celem było pokazanie szerokiej perspektywy na temat aplikacji wykorzystujących LLM, a przede wszystkim tego, że w dużym stopniu są one budowane tak samo, jak oprogramowanie, które tworzymy na co dzień.

To właśnie z tego powodu, jednym z wymagań AI\_devs 3 była znajomość przynajmniej jednego języka programowania. Co prawda nie wszystkie z omawianych elementów będziemy wdrażać samodzielnie i nie musimy posiadać doświadczenia w budowie baz danych czy optymalizacji silników wyszukiwania. Pomimo tego w nadchodzących tygodniach będziemy mieć kontakt z najróżniejszymi zagadnieniami, które mogą być dla Ciebie zupełnie nowe. Potraktuj to więc jako możliwość doświadczenia szerokiej perspektywy rozwoju aplikacji, a najwięcej uwagi skieruj na obszary, które Ciebie dotyczą (np. front-end, back-end czy bazy danych).

Po dzisiejszej lekcji spróbuj przynajmniej uruchomić przykład [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch) i zadać mu kilka pytań w celu sprawdzenia jak się w nich odnajduje. Istnieje dość duże prawdopodobieństwo, że nie odpowie skutecznie na Twoje pytania — zastanów się wtedy dlaczego tak się dzieje. Przejdź przez prompty z pliku `prompts.ts` oraz sprawdź jak skutecznie FireCrawl radzi sobie z wczytywaniem treści stron, z którymi chcesz pracować.

Możesz także poświęcić chwilę na pracę z PromptFoo, którego podstawową konfigurację omawiałem w materiale wdrożeniowym i lekcji S00E02 — Prompt Engineering. Do pracy z tym narzędziem wykorzystaj Cursor IDE z wczytaną dokumentacją, co ułatwi generowanie plików konfiguracyjnych oraz szybsze zrozumienie tego rozwiązania.

Zamykając klamrą dzisiejszą lekcję, to już na tym etapie powinno być dla Ciebie zrozumiałe to, że LLM w kodzie aplikacji pozwala na sprawne przetwarzanie języka naturalnego, a także różnych formatów danych (np. audio czy obrazu). Daje to nam nowe możliwości, ale nadal fundamentem rozwoju aplikacji pozostaje Twoja wiedza oraz doświadczenie.

![](https://cloud.overment.com/S01E02-1725905893.png)

Przynajmniej kilkukrotnie tworzyliśmy prompty, które [sterowały "snem" modelu](https://twitter.com/karpathy/status/1733299213503787018?lang=en) poprzez dane dostarczone do instrukcji systemowej. Pozwala to rozszerzać wiedzę modelu, a nawet nauczyć go nowych umiejętności (np. klasyfikacji).

Zewnętrzne dane mogą być wpisane do promptu systemowego ręcznie, ale także mogą pojawić się w nim automatycznie, czego przykładem jest dość powszechnie znany RAG, czyli Retrieval-Augmented Generation.

W generatywnych aplikacjach kontekst zwykle pochodzi z bazy danych, zewnętrznego API, treści plików lub ze wszystkich tych źródeł jednocześnie. Każdy, kto ma za sobą pierwsze aplikacje łączące model z zewnętrznymi źródłami danych, wie, że wiążą się z tym interesujące możliwości, ale także szereg trudności, które po części zaadresujemy w tej lekcji.

W lekcji S00E04 omawialiśmy przykład `completion`, którego celem było sklasyfikowanie zadania do jednej z trzech kategorii - **praca / dom / inne**. Było to mało praktyczne, ponieważ zwykle zadania przypisujemy do jednego z naszych projektów lub zdefiniowanych przez nas etykiet. Sam zarządzam zadaniami w [Linear](https://linear.app/), a faktyczna lista kategorii, wygląda u mnie następująco:

![Lista kategorii wraz z nazwami, identyfikatorami oraz opisami](https://cloud.overment.com/2024-09-09/aidevs3_categories-a275042b-7.png)

W większości przypadków nowe zadania dodają się automatycznie na podstawie wiadomości, które przesyłam do mojego Agenta AI. Zdarza się jednak, że dopisuję je ręcznie w Linear. Wówczas uruchamia się webhook, na którym działa kod podobny do tego z przykładu [`linear`](https://github.com/i-am-alice/3rd-devs/tree/main/linear), w celu automatycznego przypisania projektu.

![](https://cloud.overment.com/No-Text-in-Clipboard-1725892198.gif)

Szczególnie interesująca jest funkcja `assignProjectToIssue` w której nie tylko wybierany jest projekt, ale także **programistycznie weryfikujemy poprawność identyfikatora** i w razie potrzeby, ustawiamy jego wartość na domyślną.

![](https://cloud.overment.com/2024-09-09/aidevs3_assign-79f809f8-a.png)

Przykład [`linear`](https://github.com/i-am-alice/3rd-devs/tree/main/linear) pokazuje nam zatem, że programistyczne wykorzystanie dużych modeli językowych faktycznie sięga dalej niż interfejs czatu. No bo w tym przypadku, proces klasyfikacji miał miejsce jedynie **w odpowiedzi na akcję użytkownika**, a nie jego bezpośrednią wiadomość. W dodatku do klasyfikacji dojdzie tylko wtedy, jeśli użytkownik sam nie ustawił projektu (i również jest to programistycznie sprawdzane).

Także nawet jeśli problem niedeterministycznej natury modeli jest trudny do rozwiązania, to nadal możemy skorzystać z ich możliwości w taki sposób, aby **wspierały istniejące aktywności** lub **częściowo autonomicznie** realizowały jakiś proces.

W powyższej automatyzacji, informacje na temat dostępnych projektów i zasad ich wybierania, zostały zapisane **ręcznie w prompcie**, w sekcji `context`.

![](https://cloud.overment.com/2024-09-09/aidevs3_projects-3ca1bb2d-9.png)

Nie zawsze tak będzie. W zamian, kontekst będzie wczytywany **dynamicznie** z wielu źródeł, co nierzadko będzie wymagało dodatkowej transformacji treści. No ale zacznijmy od początku.
## Rekomendowane formaty wymiany danych
Duże Modele Językowe nie mogą czytać plików binarnych jak PDF czy DOCX, więc musimy je przekonwertować, aby dostarczyć je w zrozumiałej formie. W zależności od dokumentu, może to oznaczać utratę formatowania, co przekłada się na ryzyko błędnej interpretacji treści. Nawet pojawienie się obrazu czy zewnętrznego odnośnika utrudnia zrozumienie zawartości pliku. Każda związana z tym niejasność zwiększa wprost ryzyko konfabulacji i obniża skuteczność naszego systemu.

Jeśli masz doświadczenie w przetwarzaniu dokumentów PDF, wiesz, że trudno mówić o uniwersalnym parserze. Ale zbudowanie narzędzia do rozpoznawania określonych szablonów czy odnajdywania konkretnych informacji jest zazwyczaj możliwe. Obecność dużych modeli językowych dodatkowo przesuwa granicę tego, co do tej pory było uznawane za możliwe, ale nie rozwiązuje wszystkich problemów.

Przykładem może być poniższy zrzut ekranu z treścią lekcji AI\_devs 3, zapisanej w [notion](https://www.notion.so/). Dzięki [notion-to-md](https://www.npmjs.com/package/notion-to-md) możemy pobrać ją w formie otwartego formatu markdown. Sugeruje to zatem, że cała jej treść, łącznie z obrazkami, będzie dostępna dla LLM.

![](https://cloud.overment.com/2024-09-08/aidevs3_files-cecc0ce7-6.png)

Okazuje się jednak, że tak nie jest, bo wczytanie załączników wymaga logowania, czego model językowy domyślnie nie jest w stanie zrobić. Obrazek poniżej jest tylko jednym z przykładów tego, że **zawsze będzie nam zależało na dokładnej weryfikacji, czy mamy swobodny dostęp do treści.** W przypadku Notion jest to możliwe poprzez wygenerowanie tymczasowego linku, ale nie zawsze tak będzie.

![](https://cloud.overment.com/2024-09-08/aidevs3_locked-f6280053-1.png)

Samo dotarcie do treści nie jest jedynym problemem, który przed nami stoi. LLM będziemy wykorzystywać również w celu **transformacji istniejących dokumentów**, co w przypadku formatów binarnych (np. PDF) ponownie jest utrudnione.

Zatem już na początkowym etapie musimy odpowiedzieć sobie na pytania:

- **Źródło:** Skąd pochodzą dane i jak często się zmieniają? Czy będą odczytywane bezpośrednio ze źródła, czy musimy zapisać ich wersje po stronie aplikacji i regularnie aktualizować? A może dane będą tworzone i mamy dużą kontrolę nad ich strukturą?
- **Organizacja:** Jak wygląda struktura danych, w tym także powiązania, np. ze źródłem, użytkownikami oraz pozostałymi danymi. Co poza główną treścią powinniśmy wiedzieć na ich temat oraz co o nich powinien wiedzieć model?
- **Dotarcie:** Dla kogo dane będą dostępne i w jaki sposób będziemy je przeszukiwać oraz filtrować? Jakie narzędzia będą zaangażowane w ten proces?
- **Dostarczenie:** Jak dane będą prezentowane modelowi i czy proces ten będzie rozłożony na kilka etapów (np. w celu podsumowania dużego dokumentu). Czy dane będą przetwarzane indywidualnie czy w połączeniu z innymi informacjami?
- **Prezentacja / Zapis:** Co się dzieje z rezultatem zwróconym przez model? W jakim formacie zostaną one zapisane i/lub przedstawione użytkownikowi? Czy poza odpowiedzią modelu, musimy zapisać coś jeszcze?
- **Modyfikacja**: Czy oryginalne dane mają zostać nadpisywane? W jaki sposób będziemy mogli odwrócić działanie modelu? Jakie ograniczenia narzuca na nas format danych? Jak możemy ograniczyć ryzyko błędu (np. przez nadzór człowieka)?

Powyższe pytania prowadzą nas do wniosku, że warto dążyć do pracy z formatami otwartymi, takimi jak **markdown, txt, json czy yaml**, a także bezpośrednio z bazami danych. Projekty, w których do gry wchodzą formaty binarne lub z innego powodu dostęp do informacji jest utrudniony, będą musiały być wyspecjalizowane w określonym zadaniu. Czasem może okazać się, że już po wstępnej weryfikacji dany projekt jest nieopłacalny w dalszej realizacji.
## Transformacja i kompresja treści
Przykład `websearch`, który omawialiśmy w lekcji S01E01 — Interakcja pozwalał na połączenie dużego modelu językowego z wynikami wyszukiwania /w Internecie oraz wybranymi stronami www.

Oryginalnie treść strony www zapisana jest w formacie HTML i zawiera szereg niepotrzebnych (z punktu widzenia modelu) tagów. Dzięki FireCrawl od razu otrzymywaliśmy oczyszczoną strukturę Markdown, natomiast w praktyce często będziemy przeprowadzać podobne transformacje sami.

Dla przykładum, dokument PDF (o prostej strukturze), może zostać przekonwertowany do HTML, a HTML do markdown. W takiej formie treść może zostać zmieniona przez LLM, który potrafi formatować wypowiedzi z pomocą tej składni. Następnie odwracamy proces, aby uzyskać oryginalny format PDF.

![](https://cloud.overment.com/2024-09-08/aidevs3_format-41aa0985-3.png)

Powyższy mechanizm nie sprawdzi się w przypadku złożonych struktur PDF, ale sama koncepcja konwertowania formatów może okazać się użyteczna także w innych sytuacjach. Jedną z nich może być generowanie formatu YAML, zamiast JSON, o czym wspominał Andrej Karpathy w filmie [Let's build tokenizer together](https://www.youtube.com/watch?v=zduSFxRajkE), wskazując, że składania YAML może być znacznie bardziej przyjazna modelowi ze względu na proces tokenizacji.

Dla prostego obiektu JSON, mówimy o 30% różnicy tokenów (według Tiktokenizer i modelu GPT-4o), których model nie musi generować, jeśli zapiszemy te dane w formacie YAML. To przekłada się także na niższe koszty, oraz krótszy czas inferencji.

![](https://cloud.overment.com/2024-09-08/aidevs3_json-9bcdd6a2-c.png)

![](https://cloud.overment.com/2024-09-08/aidevs3_yaml-bbd44918-3.png)

Zatem pracując z różnymi formatami danych, zawsze w pierwszej kolejności warto zadać sobie pytanie o to, czy możemy dokonać transformacji do bardziej przyjaznej formy. To samo dotyczy obrazów, plików audio oraz wideo i o tym wszystkim, będziemy jeszcze mówić.

Transformacja i oczyszczanie danych to nie tylko kwestia oszczędności tokenów, ale także zarządzania uwagą modelu, która nie musi być rozproszona na niepotrzebne informacje. Choć zdolność zarządzania uwagą jest stale optymalizowana, nadal trzeba ją mieć na uwadze, szczególnie w przypadku modeli Open Source.

Do dyspozycji mamy także różne rodzaje kompresji, które mogą być zrealizowane programistycznie lub z pomocą modelu językowego. Najbardziej klasycznym przykładem, który można spotkać w Internecie, jest **podział dokumentu na mniejsze fragmenty (tzw. Chunking)**. Problem w tym, że w wyniku "pocięcia" pliku, możemy zgubić istotny kontekst, co prowadzi do konfabulacji lub generowania poprawnych, ale niekompletnych odpowiedzi.

W zamian możemy przeprowadzić bardziej zaawansowane przetwarzanie treści pliku, analizując go w całości, często kilkukrotnie, aby wygenerować nowe dane. Mowa tutaj o utworzeniu notatek na temat omawianych koncepcji, definicji czy problemów. W rezultacie, zamiast zestawiać zapytanie użytkownika z oryginalną treścią pliku, rolę kontekstu przejmują wygenerowane notatki. Przykład takiego podejścia widać poniżej, gdzie z wgranego pliku zostaje wygenerowane ogólne podsumowanie i lista koncepcji, które stanowią kontekst zapytania.

Jeśli na etapie przetwarzania pliku nie popełnimy dużych błędów, to ryzyko pominięcia istotnych danych, jest mniejsze, niż w przypadku dzielenia dokumentu na fragmenty.

![](https://cloud.overment.com/2024-09-08/aidevs3_file-69afa8b1-d.png)

Podsumowując temat transformacji treści:

- Warto dążyć do pracy z formatami otwartymi, o ile to możliwe. Składnia markdown oraz format JSON (czy YAML) są najbardziej elastyczne, a ich popularność sprawia, że możemy wykorzystać je w połączeniu z zewnętrznymi systemami (np. CMS czy klientami poczty)
- Pracując na zewnętrznych danych, nie musimy z góry zakładać, że trafią do modelu w swojej oryginalnej formie. Fakt, że mamy do dyspozycji duży model językowy sprawia, że możemy je wcześniej przetworzyć.
- Pomimo dużej elastyczności, jaką oferują duże modele językowe, nadal warto myśleć o możliwym wyspecjalizowaniu rozwiązań i usystematyzowaniu źródeł danych. Choć może się to zmienić w przyszłości, trudno jest wgrać całą bazę wiedzy do promptu systemowego i oczekiwać jakościowych odpowiedzi. W zamian, będzie nam zależało na pracy wyłącznie z tymi danymi, które w danej chwili są niezbędne do wygenerowania odpowiedzi.
## Dedykowane źródła wiedzy dla LLM
Dopasowanie aplikacji do zewnętrznych źródeł danych nie jest jedyną strategią, którą możemy rozważyć. Czasami bardziej uzasadnione będzie zbudowanie bazy wiedzy od podstaw, z myślą o LLM. Nie oznacza to jednak, że całość musi być ręcznie pisana przez człowieka, bo ten może tylko weryfikować treści wygenerowane przez model.

Mowa więc tutaj o sytuacji w której skuteczne przeniesienie zawartości dokumentów do modelu nie będzie możliwe. Wówczas jednorazowo przechodzimy przez proces częściowo automatycznego przetworzenia treści. Gdy dane z którymi pracujemy nie zmieniają się zbyt często, takie podejście może być uzasadnione.

Alternatywnie, baza wiedzy może być generowana w trakcie interakcji z aplikacją. Jedną z implementacji takiego podejścia jest projekt [mem0](https://github.com/mem0ai/mem0). Jego założeniem jest dynamiczne zapamiętywanie informacji na potrzeby bieżącej interakcji lub zadań realizowanych w przyszłości. Jest to szczególnie wartościowe w przypadku agentów AI, aczkolwiek obecnie trudno jest jeszcze mówić o ich w pełni autonomicznym działaniu.

W przykładzie [`files`](https://github.com/i-am-alice/3rd-devs/tree/main/files) znajduje się logika asystenta zdolnego do zapamiętywania historii konwersacji oraz kreowania własnych wspomnień. Mechanizm ten jest dość prosty i dla ułatwienia nie korzysta z bazy danych, lecz zapisuje wiedzę w plikach markdown, a do ich przeszukiwania wykorzystuje tzw. 'vector store' o nazwie [faiss](https://github.com/facebookresearch/faiss), który w przyszłości zastąpimy bazą wektorową, np. Qdrant. **UWAGA:** Jeśli nie wiesz nic na temat baz wektorowych, na potrzeby tego przykładu po prostu pomyśl o nich jak o silniku wyszukiwania.

Przykład rozbudowuje interakcję z modelem o **przeszukanie dostępnej wiedzy** oraz dodanie jej do kontekstu głównego promptu systemowego. Poza tym zawiera także dodatkowy krok, umożliwiający zapisanie bieżącej konwersacji, a także dedykowanych wspomnień. Zatem nie mówimy tutaj o połączeniu z istniejącym już źródłem danych, lecz budowaniem go od podstaw, z myślą o asystencie.

![](https://cloud.overment.com/2024-09-09/aidevs3_files-07f43abf-b.png)

Działanie przykładu [`files`](https://github.com/i-am-alice/3rd-devs/tree/main/files) widoczne jest na poniższym filmie, lecz zachęcam do jego samodzielnego uruchomienia i porozmawiania z asystentem. Szybko okaże się, że zapisywane wspomnienia są duplikowane, a po zapamiętaniu większej liczby informacji, odzyskanie ich wszystkich nie będzie możliwe.

<div style=padding:56.25% 0 0 0;position:relative;><iframe allow=autoplay; fullscreen; picture-in-picture; clipboard-write frameborder=0 src=https://player.vimeo.com/video/1007617435?badge=0&autopause=0&player\_id=0&app\_id=58479 style=position:absolute;top:0;left:0;width:100%;height:100%; title=01\_02\_learn></iframe></div><script src=https://player.vimeo.com/api/player.js></script>

Powodem problemów z zapisywaniem i odzyskiwaniem informacji, jest sama implementacja, która obecnie nie uwzględnia **aktualizacji wpisów** czy rozbudowanej logiki "przypominania" wcześniejszych wspomnień.

Wspomnienia asystenta zapisane są w katalogu `context/memories`, który można otworzyć z pomocą aplikacji [Obsidian](https://obsidian.md) w ramach której dostępna jest możliwość wizualizacji z pomocą interaktywnego grafu. Już po wymianie pierwszych wiadomości można wyrobić sobie wstępną intuicję na temat potencjalnych rozwiązań i strategii organizowania informacji. Jest to wartościowe, ponieważ w podobny sposób będziemy budować system umiejętności oraz pamięci długoterminowej dla agentów AI.

![](https://cloud.overment.com/2024-09-09/aidevs3_map-08355b71-e.png)

Wizualizacja w postaci grafu również nie jest tutaj przypadkowa, ponieważ duże modele językowe mogą po nim nawigować, gromadząc informacje na potrzeby rozmowy czy aktualnie realizowanego zadania. Niestety (przynajmniej obecnie) wyzwaniem pozostaje ryzyko duplikowania wpisów oraz generowanie dynamicznej struktury grafu, o czym można poczytać we wpisie "[Constructing Knowledge Graphs From Unstructured Text Using LLMs](https://neo4j.com/developer-blog/construct-knowledge-graphs-unstructured-text/)" na blogu Neo4J. Z tego powodu zwykle będziemy dążyć do poruszania się w ramach z góry ustalonego schematu.
## Zewnętrzne źródła wiedzy
W przykładzie [`websearch`](https://github.com/i-am-alice/3rd-devs/tree/main/websearch) wczytywaliśmy dane z Internetu. Robiliśmy to każdorazowo, więc dane zawsze były aktualne. Jednak gdy do gry wchodzi zestaw danych w postaci dokumentów, bazy produktów czy katalogów, musimy zadbać o ich synchronizację. W związku z tym, zawsze musimy zapisywać **oryginalny identyfikator lub odnośnik do źródła**. Ewentualnie możemy generować własne identyfikatory o ile treści nadal pozostaną poprawnie powiązane.

Poniżej mamy przykład **połączenia z artykułami publikowanymi na blogu**, których treść ma trafić do modelu. Każdy z wpisów jest dość obszerny i nie może być w całości dołączony do kontekstu promptu systemowego. Co więcej, musimy mieć także możliwość przeszukiwania tych treści. W związku z tym, konieczne jest przetworzenie wpisów oraz zapisanie ich w lokalnej bazie danych i/lub dodanie do indeksu silnika wyszukiwania.

![](https://cloud.overment.com/2024-09-09/aidevs3_index-fcbf4cae-8.png)

Taki system wymaga ustawienia harmonogramu, według którego będą pobierane nowe wpisy, lub webhooków, które będą powiadamiać naszą aplikację o zmianach na blogu.

Aby nie było tutaj wątpliwości, wyjaśnię:

- Na blogu mamy **cały artykuł** w formie przyjaznej człowiekowi
- Na potrzeby LLM musimy dostosować tę formę, a ta będzie różnić się w zależności od zamierzonego celu. Przykładowo, jeśli budujemy narzędzie tłumaczące treść artykułu, musimy podzielić go na mniejsze fragmenty i przetwarzać je indywidualnie. Powodem jest fakt, że obecnie LLM mają niski limit "output token" i nie są w stanie przepisać treści całego artykułu.
- Zatem, gdy podzielimy artykuł na mniejsze fragmenty, nadal chcemy zachować informację o ich powiązaniu z oryginałem. I dlatego potrzebny jest nam identyfikator.

Innym przykładem jest cytowanie źródeł, co przydaje się chociażby w sytuacji, gdy model jest podłączony do Internetu. Poza wypowiedziami, z punktu widzenia użytkownika, wartościowe jest także dołączanie odnośników do stron www, którymi posługuje się model.
## Dostarczanie kontekstu dla modelu
"API modeli jest bezstanowe" — to zdanie wydaje się oczywiste i uzasadnia potrzebę przekazywania do modelu **całej treści konwersacji** za każdym razem. Nie jest to jednak rozwiązanie wszystkich problemów, co widać na poniższym przykładzie.

Mamy tutaj wymianę wiadomości, w której użytkownik pyta, kim jest overment. Wówczas system przeszukuje Internet, wczytując do kontekstu informację, na podstawie której udziela odpowiedzi. Jednak **jeżeli kontekst wyników wyszukiwania zostanie usunięty z konwersacji**, to kolejne pytanie pogłębiające zostanie zaadresowane błędnie.

![](https://cloud.overment.com/2024-09-10/aidevs3_state-e28e27c6-6.png)

Dość szybko nasuwa się na myśl rozwiązanie polegające na tym, aby treść wyników wyszukiwania pozostała w kontekście konwersacji. Jednak w praktyce rzadko jest to możliwe, ponieważ liczba tokenów rośnie bardzo szybko, a model odwraca uwagę od oryginalnych instrukcji. Znacznie lepszym podejściem jest uwzględnienie możliwości ponownego wyszukiwania z mechanizmem pamięci podręcznej, aktywowanej na kilka/kilkanaście minut.

Zatem problem z dostarczaniem wiedzy do kontekstu pojawia się już w związku z jego samą obecnością. Programistycznie musimy zadbać o to, aby wiedza wymagana do udzielenia odpowiedzi była w danej chwili dostępna dla modelu. To jednak nie koniec problemów, ponieważ różne źródła wiedzy będą się ze sobą łączyć i uzupełniać.

Nawet tak niewinne pytanie jak "znajdź w Internecie wszystko, co wiesz na mój temat" przestaje być oczywiste, ponieważ model domyślnie nie wie, co to znaczy "mój temat" i najpierw musi wczytać nasz profil, aby na jego podstawie wygenerować zapytania do wyszukiwarki.

![](https://cloud.overment.com/2024-09-10/aidevs3_loading-df70f143-b.png)

Powyższa sytuacja zdarza się praktycznie na każdym kroku. Poniżej widzimy przykład prostej prośby o włączenie ulubionej muzyki, co rzeczywiście ją uruchamia. Analogicznie moglibyśmy zapytać o muzykę na poprawę humoru, ułatwienie skupienia czy na nocną jazdę samochodem. W każdym z przypadków, schemat jest podobny.

![](https://cloud.overment.com/2024-09-10/aidevs3_music-df9dde4c-b.png)

Choć z perspektywy użytkownika tego nie widać, w tle wydarzyło się kilka dodatkowych akcji. Przede wszystkim zostały wybrane 2 z kilkudziesięciu akcji, które w tym przypadku mogą się przydać. Poza nazwami, system wygenerował polecenia związane z sposobem ich uruchomienia.

![](https://cloud.overment.com/2024-09-10/aidevs3_skills-3e6453d0-0.png)

Następnie asystent zadał sobie kilka pytań, aby gruntownie przeskanować swoją pamięć w poszukiwaniu informacji o ulubionej muzyce. W tle wydarzyły się jeszcze akcje związane z klasyfikacją tych zapytań, przez co każde z nich dotyczyło różnych obszarów pamięci asystenta. Mówię o nich dlatego, że proces przywoływania wspomnień jest znacznie bardziej rozbudowany niż wypisanie kilku pytań i zresztą przekonamy się o tym w dalszej części kursu.

![](https://cloud.overment.com/2024-09-10/aidevs3_recall-14eac580-8.png)

Na podstawie zebranych informacji, system podjął decyzję o wykonaniu zapytania do API Spotify, przekazując listę potencjalnych utworów, które mogą mi się spodobać. W rezultacie muzyka została uruchomiona, a system wygenerował potwierdzenie widoczne dla użytkownika.

![](https://cloud.overment.com/2024-09-10/aidevs3_play-f4035209-1.png)

Przenosząc to na wizualizację, zapytanie wymagające skorzystania z wielu narzędzi w odpowiedniej kolejności, wygląda następująco:

- Zapytanie użytkownika zostaje przeanalizowane w celu ułożenia planu i zadania pytań pogłębiających.
- Dodatkowy kontekst zostaje pobrany automatycznie z bazy danych w wyniku wyszukiwania
- Zebrane informacje zostają przekazane do zewnętrznego API
- W zależności od odpowiedzi API, użytkownik otrzymuje wiadomość potwierdzającą uruchomienie muzyki. W przypadku błędu podejmowane są ponowne próby jej włączenia.

![](https://cloud.overment.com/2024-09-10/aidevs3_schema-67265988-6.png)

Przykład `Spotify` był już omawiany w poprzednich edycjach AI\_devs, lecz tam mówiliśmy o dość bezpośrednim skorzystaniu z konkretnego narzędzia. Tutaj natomiast mamy do czynienia z systemem zdolnym do zaplanowania swoich działań, wraz z możliwością zareagowania na nieprzewidziane sytuacje, z którymi zwykle może poradzić sobie samodzielnie.

Powyższy schemat obrazuje, jak ważne jest kontrolowanie przepływu danych na poszczególnych etapach logiki. Podobnie jak w przypadku funkcji programistycznych, nie zawsze musimy przetwarzać wszystkie dostępne dane, lecz wybierać tylko te, które w danej chwili są nam potrzebne. Tutaj sytuacja jest o tyle bardziej złożona, że musimy okiełznać niedeterministyczną naturę modeli.
## Podsumowanie
Fizyczne dostarczanie kontekstu do promptu omawialiśmy w lekcji S00E02 — Prompt Engineering. Natomiast teraz widzimy, że kontekst ten, niemal zawsze będzie dostarczany programistycznie i będzie pochodził z różnych źródeł lub był generowany od podstaw przez model. Dlatego warto zadać sobie pytania związane z tym, z jakich danych będziemy korzystać oraz w jaki sposób będziemy je przetwarzać.

Warto zapoznać się z przykładem [`files`](https://github.com/i-am-alice/3rd-devs/tree/main/files), aby zobaczyć to, w jaki sposób dane mogą być wykorzystywane przez model w trakcie interakcji. Równie istotne jest także to, jak model może transformować treści tak, aby móc łatwiej posługiwać się nimi w przyszłości.

Jeśli korzystasz z aplikacji takich jak Todoist, Clickup czy Linear, to spróbuj także odwzorować mechanizm przydzielania nowych zadań do projektów, podobnie jak pokazuje to przykład [`linear`](https://github.com/i-am-alice/3rd-devs/tree/main/linear). Poza przypisaniem zadania do projektu, możliwe jest także uzupełnienie lub wzbogacenie jego opisu, na podstawie wyników wyszukiwania w Internecie czy własnej bazie wiedzy.

Finalnie, patrząc na przykłady omówione w tej lekcji, można odpowiedzieć sobie na pytanie: **w jaki sposób dostarczenie własnego kontekstu, może pomóc w optymalizacji zadania [...]** (tu wpisz aktywność ze swojej codzienności).

![](https://cloud.overment.com/0103-1730871460.jpeg)

Działanie modeli generatywnego AI jest imponujące, ale nie wiemy jednoznacznie, czy mamy do czynienia z rozumowaniem, czy jedynie powtarzaniem wyuczonych schematów i treści danych treningowych. [Ilya Sutskever](https://x.com/ilyasut) czy [Geoffrey Hinton](https://x.com/geoffreyhinton) uważają, że "skuteczne przewidywanie kolejnego tokenu wymaga faktycznego zrozumienia treści". Z kolei [Yan LeCun](https://twitter.com/ylecun) uważa, że mówimy tutaj jedynie o prymitywnych mechanizmach rozumowania, którym daleko jest od procesów zachodzących w ludzkim mózgu. W sieci łatwo także spotkać głosy mówiące o tym, że duże modele językowe są zwykłym oszustwem, a przeprowadzanie badań nad nimi, spowalnia rozwój technologii.

Poniżej mamy "zagadkę", która tylko pozornie przypomina [popularną łamigówkę](https://en.wikipedia.org/wiki/River_crossing_puzzle) o przekraczaniu rzeki. Normalnie jej trudność uzależniona jest od ograniczeń, które musimy przestrzegać. Jednak w naszym przypadku nie ma wzmianki o żadnym z nich. Pomimo tego model nie jest w stanie tego zauważyć i sugeruje nam skomplikowaną listę kroków.

![](https://cloud.overment.com/2024-09-10/aidevs3_puzzle-4299a08f-f.png)

Takie zachowanie sugeruje, że nie mamy tutaj do czynienia z rozumowaniem, lecz podążaniem za schematami danych treningowych. To samo widzimy w innym przykładzie, w którym model "twierdzi", że jest w stanie posługiwać się [algorytmem MD5](https://en.wikipedia.org/wiki/MD5) i faktycznie z powodzeniem enkoduje słowo "Hello". Jednak jeśli tylko lekko je zmienimy na "H3llo", to wygenerowany rezultat jest błędny.

![](https://cloud.overment.com/2024-09-10/aidevs3_md5-b54d04aa-f.png)

Takie problemy dotyczą nie tylko dużych modeli językowych, ale modeli generatywnego AI w ogóle. Poniżej mamy obrazek "pustego pokoju, w którym nie ma słonia" wygenerowany przez Dall-E 3.

![](https://cloud.overment.com/2024-09-10/aidevs3_elephant-ec6310f4-8.png)

Ponownie widać tutaj zachowanie sugerujące, że z żadną inteligencją nie mamy tutaj do czynienia. Jak więc możemy zaufać modelom, skoro nie możemy polegać na nich w tak prostych sytuacjach?

Patrząc na to z praktycznego punktu widzenia, trudno jest nie dostrzegać zarówno szerokich możliwości, jak i rażących wad. W dodatku nie mówimy tutaj wyłącznie o umiejętnościach samych modeli, ale także ograniczaniach związanych z nimi technologii czy infrastruktury. Dla podkreślenia tego, o czym teraz mówię, tak wygląda status usług Anthropic z ostatnich 90 dni. Można dodać do niego tylko tyle, że 99.43% dostępności usługi to bardzo optymistyczna wartość.

![](https://cloud.overment.com/2024-09-10/aidevs3_anthropic-55d47b1a-f.png)

Osoby próbujące stawać w obronie generatywnego AI twierdzą, że jest to "dopiero początek" i że modele wciąż się rozwijają, a wszystkie problemy zostaną z czasem rozwiązane. Trudno w tej chwili powiedzieć, czy faktycznie tak się stanie, ale ogólny postęp świetnie oddaje rozwój Midjourney, który dodatkowo można zestawić z modelem takim jak [Flux](https://www.3daistudio.com/blog/FLUX-Image-Generator-for-3D-Models) czy [Recraft v3](https://replicate.com/recraft-ai/recraft-v3)

![](https://cloud.overment.com/2024-09-10/aidevs3_midjourney-0d26fd45-4.png)

Choć nie wiemy, co przyniosą nam kolejne wersje modeli oraz jak będą rozwijały się narzędzia, tak przykłady produktów takich jak Cursor, [Replit Agent](https://docs.replit.com/replitai/agent) czy Perplexity sugerują, że nawet jeśli generatywna sztuczna inteligencja miałaby się całkowicie zatrzymać w rozwoju już dziś, to nadal mamy na czym budować rozwiązania generujące wartość.

Możemy zatem zdecydować się na zastosowanie strategii polegającej na praktycznej pracy z modelami i osobistym doświadczaniu związanych z nimi możliwości. Już teraz możemy z powodzeniem patrzeć na nie jak na narzędzia, które sprawdzają się tylko w wybranych scenariuszach. Dlatego zamiast próbować zastosować je wszędzie tam, gdzie to możliwe, mądrzej jest sięgać po nie tylko tam, gdzie faktycznie mogą nam się przydać.

No i o tym porozmawiamy dzisiaj.
## Bazowe ograniczenia modeli
Model Transformer, który stanowi podstawę dużych modeli językowych, oryginalnie powstał w celu **tłumaczenia treści pomiędzy językami**, co sprawia, że jest szczególnie dobry w **transformacji istniejących treści**. Jego kluczowym elementem, jest mechanizm uwagi (eng. attention mechanism, świetnie wyjaśniony na filmie https://www.youtube.com/watch?v=eMlx5fFNoYc), dzięki któremu model utrzymuje skupienie na istotnych fragmentach, zachowując kontekst oraz występujące powiązania.

![](https://cloud.overment.com/2024-09-10/aidevs3_attention-295880f1-4.png)

Zapoznanie się nawet z ogólnymi mechanizmami modelu Transformer pozwala zrozumieć, że mamy do czynienia z mechanizmem naśladującym ludzki mózg, a nie z ludzkim mózgiem. Oznacza to, że w niektórych zadaniach będzie lepszy niż człowiek, a w innych wręcz przeciwnie.

W ostatnich latach firmy rozwijające duże modele językowe, powstrzymują się od publikowaniem szczegółów na temat architektury. Jednak z dość dużym prawdopodobieństwem możemy podejrzewać, że modele takie jak GPT-4 wykorzystują koncepcję "[Mixture of Experts](https://developer.nvidia.com/blog/applying-mixture-of-experts-in-llm-architectures/)". Zakłada ona, że model językowy składa się z sieci wyspecjalizowanych w określonych zadaniach, a jedna z nich (router) odpowiada za wybór tych, które najbardziej pasują do danego zadania.

![](https://cloud.overment.com/2024-09-10/aidevs3_moe-606b42ab-8.png)

Prawdopodobnie (nie mam na to dowodu) dlatego skuteczność działania modelu spada dla określonych zadań, gdy wymagamy odpowiedzi w określonym formacie, np. JSON Mode, co zostało opisane w [Let me speak Freely?](https://arxiv.org/abs/2408.02442v1). Można podejrzewać, że w takiej sytuacji uwaga modelu skupia się bardziej na sposobie zapisu, niż faktycznym zadaniu. To może prowadzić do wniosku, że uzasadnione będzie rozbijanie zadań na mniejsze etapy. Poza tym, sprzyja to także utrzymaniu uwagi na głównych instrukcjach.

No i w tym wszystkim należy także pamiętać, że duże modele językowe poznają świat w oparciu o dane (początkowo wyłącznie tekst, a teraz także przez inne formaty). W związku z tym trudniej przychodzi im zrozumienie tego, co jako ludzie uczymy się poprzez doświadczanie. Sytuacji nie ułatwia fakt, że zamiast słowami, posługują się tokenami, które również przyczyniają się do wielu problemów.

Powyższe zagadnienia związane z architekturą modeli bezpośrednio wiążą się z ich możliwościami oraz ograniczeniami. Dobrze jest mieć je na uwadze podczas projektowania aplikacji oraz promptów, co staram się pokazywać w każdym z prezentowanych przykładów.

Podsumowując tę część:

- Łatwiej jest **transformować istniejące treści**, niż generować nowe.
- Łatwiej jest **weryfikować treści**, niż je transformować.
- Modele poznają świat przez treści, a nie przez wszystkie zmysły.
- Mechanizmy utrzymywania uwagi, rozpoznawania kontekstu i powiązań są imponujące, lecz mają swoje braki.
- "Przewidywanie kolejnego tokenu" wymaga jakiegoś stopnia rozumienia treści, a to wymaga generalizacji / kompresji informacji, co z kolei wiąże się ze zdolnością do zauważania wzorców.
## Koszty, Rate Limit i Debugowanie
Limity możliwości modeli to nie jedyne wyzwanie. Ponieważ korzystanie z modeli językowych jest płatne i rozliczane na podstawie przetworzonych tokenów, konieczna jest kontrola wydatków, zwłaszcza w zespole. Jeszcze do niedawna ustawienie limitów nie było możliwe na poziomie dostawcy, lecz wiązało się ze zbudowaniem własnego rozwiązania ograniczającego dostęp do kluczy API. Teraz niemal wszystkie usługi oferują pewien poziom kontroli kosztów z poziomu panelu (mowa tutaj także o Anthropic i OpenAI), albo z uwzględnieniem samego projektu, albo indywidualnych użytkowników.

![](https://cloud.overment.com/2024-09-10/aidevs3_workspace-c5c591ef-f.png)

Ustawienie limitów dla użytkownika jest krytyczne, ponieważ zwykła pomyłka w kodzie może doprowadzić do wykorzystania dostępnego budżetu już na etapie developmentu, o produkcji nie wspominając.

W zależności od sytuacji, dobrym rozwiązaniem jest korzystanie tam gdzie to możliwe, z tańszych wersji modeli, których ceny już teraz są bardzo niskie (np. [Gemini Flash](https://github.com/google-gemini/gemini-api-quickstart)).

Po udostępnieniu aplikacji użytkownikom, poza kosztami, problemem staje się także "rate limit", czyli ograniczenia liczby zapytań do API, które zwykle obejmują:

- liczbę tokenów na minutę / dzień
- liczbę zapytań na minutę / dzień

Limity różnią się w zależności od modelu, dostawcy oraz poziomu konta (tzw. tier), który wzrasta z czasem. Gdy zależy nam na szybszym dostępie do większych limitów, możliwe jest skontaktowanie się z obsługą klienta w celu indywidualnego rozpatrzenia sprawy i/lub skorzystanie z usług takich jak Amazon Bedrock czy Azure OpenAI Service. Tak czy inaczej, limity wydatków oraz dostępu do API musimy traktować poważnie, bo po publikacji aplikacji na produkcji, trudno jest zaadresować ten temat w krótkim czasie.

Poza sztywnymi limitami, w pracy z modelami językowymi interesuje nas także faktyczne zużycie tokenów oraz estymacja kosztów działania aplikacji. Obecnie najlepszym rozwiązaniem do tego celu jest skorzystanie z narzędzi monitorujących, takich jak wspomniany już LangFuse, [LangSmith](https://smith.langchain.com/), [Portkey](https://portkey.ai/), [Parea](https://www.parea.ai/) czy inne (sam korzystam z LangFuse). Dzięki nim mamy wgląd zarówno w ogólne statystyki przetworzonych tokenów, jak i tokenów potrzebnych do wykonania poszczególnych zapytań.

![Przykład panelu langfuse monitorującego aplikację wykorzystującą generatywne AI](https://cloud.overment.com/2024-09-11/aidevs3_monitoring-2d7991a0-c.png)

Połączenie z LangFuse możliwe jest albo bezpośrednio przez API lub SDK (wówczas musimy sami zadbać o przekazanie kompletu informacji do monitorowania), albo poprzez dostępne integracje, które zdejmują z nas część obowiązków. Choć w przykładzie [`langfuse`](https://github.com/i-am-alice/3rd-devs/tree/main/langfuse) korzystamy z interfejsu dla JavaScript, to kluczowa do zrozumienia jest wyłącznie koncepcja, która polega na stworzeniu kilku metod z pomocą których będziemy mogli wysyłać zdarzenia. Szczegóły samej platformy LangFuse omawiam w poniższym filmie.

<div style=padding:56.25% 0 0 0;position:relative;><iframe allow=autoplay; fullscreen; picture-in-picture; clipboard-write frameborder=0 src=https://player.vimeo.com/video/1008437926?badge=0&autopause=0&player\_id=0&app\_id=58479 style=position:absolute;top:0;left:0;width:100%;height:100%; title=01\_03\_langfuse></iframe></div><script src=https://player.vimeo.com/api/player.js></script>

Także podsumowując, połączenie aplikacji z Langfuse polega na przesyłaniu danych dla każdego zapytania, z uwzględnieniem interakcji z modelem oraz akcji powiązanych z działaniem modelu. Inaczej mówiąc — przesyłamy wszystko to, co pomoże nam zrozumieć zachowanie modelu. Szczególnie przydatna jest możliwość debugowania promptów, o czym wspominałem także w lekcji S00E04 — Programowanie.
## Limity okna tokenów
Chociaż monitorowanie liczby przetwarzanych tokenów i związanych z tym kosztów mamy już za sobą, samo przeliczanie tokenów to proces, który wciąż nas interesuje. Chodzi konkretnie o posiadanie tej informacji w kodzie aplikacji, co jest istotne zarówno ze względu na limit Context Window omówiony w lekcji S00E02 — Prompt Engineering, jak i pracę z dokumentami, których rozmiar będziemy chcieli poznać.

Zarówno z wcześniejszych edycji AI\_devs, jak i materiałów wdrożeniowych, narzędzie Tiktokenizer powinno być Ci już znane. Teraz musimy wykorzystać je w kodzie aplikacji, aby poprawnie liczyć tokeny.

W przypadku OpenAI do dyspozycji mamy nową bibliotekę bezpośrednio od Microsoftu, o nazwie [Tokenizer](https://github.com/Microsoft/Tokenizer). W jej kodzie źródłowym znajdziemy listę encoderów, wykorzystywanych przez poszczególne modele, z pomocą których możemy poznać liczbę tokenów dla określonych danych.

![](https://cloud.overment.com/2024-09-11/aidevs3_encoding-7b7a0d7a-9.png)

Poza encoderem, pod uwagę musimy wziąć także tokeny specjalne, odpowiedzialne za strukturyzowanie treści przekazywanych do modelu. Mowa konkretnie o tokenach widocznych poniżej, uwzględniających zarówno tagi <|im\_start|> jak i słowa kluczowe takie jak `system` czy `user`.

![](https://cloud.overment.com/2024-09-11/aidevs3_tokens-3ea1a1ee-3.png)

W przykładzie [`tiktokenizer`](https://github.com/i-am-alice/3rd-devs/tree/main/tiktokenizer), w pliku `OpenAIService.ts` znajduje się logika odpowiedzialna za liczenie tokenów dla przekazanej listy wiadomości oraz konkretnego modelu. Całość uwzględnia także wspomniane tokeny specjalne, które również mogą różnić się w zależności od modelu i jego encodera.

![](https://cloud.overment.com/2024-09-11/aidevs3_tiktokenizer-8e152463-4.png)

Przeliczanie tokenów obowiązuje także w przypadku obrazów, lecz w tym przypadku opieramy się nie o tokenizer, lecz reguły opisane na stronie [OpenAI](https://platform.openai.com/docs/guides/vision/calculating-costs) lub instrukcji innych dostawców.

![](https://cloud.overment.com/2024-09-11/aidevs3_vision-4921141a-a.png)

Do tego tematu będziemy jeszcze kilkukrotnie wracać na przestrzeni AI\_devs 3. Tymczasem uruchom przykład [`tiktokenizer`](https://github.com/i-am-alice/3rd-devs/tree/main/tiktokenizer) i wyślij do niego przykładowe zapytanie, a następnie porównaj wynik z narzędziem Tiktokenizer dostępnym online.
## Limity generowanych treści
W lekcji S00E02 — Prompt Engineering mówiliśmy o limicie tokenów w przypadku wypowiedzi modelu, który dla modelu GPT-4o wynosi zaledwie 4096 tokenów. W przypadku modeli Claude już teraz możemy uzyskać nawet 16 000 tokenów, jednak z praktycznego punktu widzenia, nie zawsze będzie to wystarczające. Wystarczy sytuacja w której będziemy chcieli wprowadzić korektę, tłumaczenie czy dowolną inną transformację na tekście, który swoją objętością przekracza limit modelu.

W takiej sytuacji mamy kilka możliwości:

- podzielić długi tekst na mniejsze fragmenty, z których każdy będzie krótszy niż dopuszczalny limit wypowiedzi modelu
- programistycznie wykrywać powód zakończenia wypowiedzi modelu i poprosić o kontynuację

Pierwszym rozwiązaniem zajmiemy się w dalszej części kursu, natomiast drugie już teraz można zobaczyć w przykładzie [`max_tokens`](https://github.com/i-am-alice/3rd-devs/tree/main/tiktokenizer). Ograniczyłem tam celowo długość wypowiedzi modelu do zaledwie `50 tokenów`. Jeśli zatem wyślemy zapytanie z wiadomością "**Write ten sentences about apples and put them in order**", to domyślnie zadanie to nie zostanie wykonane poprawnie i zakończy się informacją o przekroczeniu wartości [`max_tokens`](https://github.com/i-am-alice/3rd-devs/tree/main/tiktokenizer), co widać poniżej.

![](https://cloud.overment.com/2024-09-11/aidevs3_max_tokens-e7f99304-6.png)

Możemy więc programistycznie wykryć ten powód i automatycznie kontynuować konwersację, dołączając do niej prośbę o dalszą wypowiedź, zaczynającą się od znaku kończącego ostatnią wiadomość.

![](https://cloud.overment.com/2024-09-11/aidevs3_continuous-f946de17-0.png)

Choć pierwsza strategia związana z podziałem treści na mniejsze fragmenty jest bardziej skuteczna, tak powyższy scenariusz również można brać pod uwagę. Zadziała on jednak tylko w przypadku modeli, w przypadku których możemy liczyć na precyzyjne podążanie za instrukcjami (np. GPT-4o).

W przykładzie [`max_tokens`](https://github.com/i-am-alice/3rd-devs/tree/main/tiktokenizer) warto także zwrócić uwagę na plik `app.ts`, gdzie znajduje się logika sprawdzająca, czy suma tokenów promptu oraz wypowiedzi modelu nie przekracza limitu kontekstu okna. Takie zapytanie i tak skończyłoby się błędem ze strony API, natomiast warto pamiętać o tym, aby precyzyjnie liczyć prompty i brać pod uwagę limity tokenów dla modelu, z którym pracujemy.

![](https://cloud.overment.com/2024-09-11/aidevs3_window-f8f57234-f.png)
## Narzucanie własnych ograniczeń
Nie wszystkie ograniczenia będą wynikać z ograniczeń samego modelu czy narzędzi, ale z naszej własnej potrzeby. Może nam w końcu zależeć na tym, aby model odmawiał realizacji wybranych zadań lub ściśle trzymał się wytycznych opisanych w prompcie.

W tym miejscu należy jednak pamiętać, że w przypadku LLM mówimy jedynie o możliwości sterowania zachowaniem modelu, a nie pełnej kontroli. W dodatku przetwarzanie języka naturalnego wiąże się z tym, że dość łatwo jest znaleźć obejście pewnych zasad, o czym mówiliśmy w lekcji S00E02 — Prompt Engineering i technikach Prompt Injection czy Jailbreaking'u.

Pierwszym przykładem ograniczeń, z których możemy chcieć skorzystać, jest Moderation API dostępne w OpenAI. Co prawda weryfikuje ono treści pod kątem zgodności z polityką tej firmy, ale i tak pozwala filtrować różne kategorie niepożądanych treści, takich jak np. przemoc.

![](https://cloud.overment.com/2024-11-05/aidevs3_moderation-8b110f2e-c.png)

Zastosowanie Moderation API polega wyłącznie na wysłaniu jednego zapytania [opisanego w dokumentacji](https://platform.openai.com/docs/guides/moderation/quickstart), więc nie będziemy się nim zajmować. Warto jednak wiedzieć, że za moderację odpowiada model `omni-moderation-latest`, który ma ograniczoną liczbę tokenów i jest podatny na jailbreaking. Sugeruje to, że na pewnym etapie możemy być zainteresowani zbudowaniem własnego modelu, który będzie oceniał zapytania według naszego regulaminu i zasad.

Bardziej elastyczną strategią narzucania własnych ograniczeń, jest wprowadzenie dodatkowych promptów **oceniających** i/lub **weryfikujących**, których zadanie będzie skupiać się wyłącznie na ocenie zapytania użytkownika i/lub wypowiedzi modelu, pod kątem naszych własnych zasad. Co ciekawe, wprowadzając własną skalę ocen, możemy programistycznie blokować zapytania, które spróbują nadpisać logikę naszego promptu.

Konkretnie, w przykładzie [`constitution`](https://github.com/i-am-alice/3rd-devs/tree/main/constitution) znajduje się przykład weryfikacji zapytania użytkownika. Jest ono sprawdzane pod kątem tego, czy wiadomość została napisana w języku polskim. Zadaniem modelu jest zwrócenie słowa `block` lub `pass`, które jest następnie weryfikowane programistycznie z pomocą instrukcji warunkowej `if`.

![](https://cloud.overment.com/2024-09-12/aidevs3_prompt-a3077398-0.png)

Oznacza to, że jeśli cokolwiek zaburzy działanie naszego promptu i zwrócona wartość nie będzie równa dokładnie `pass`, to zapytanie zostanie odrzucone.

Podobny prompt moglibyśmy uruchomić także na odpowiedzi zwracanej przez model, aby dodać kolejną warstwę moderacji. Co więcej, mówimy tutaj o **zupełnie oddzielnych promptach**, które są wykonywane w tle, a więc użytkownik nie ma do nich fizycznego dostępu.

Niestety, nie jest to perfekcyjne zabezpieczenie przed prompt injection, ponieważ treść przesłana do modelu może być sfabrykowana, aby je ominąć. Poza tym może się okazać, że przypadkowo blokujemy zapytania, które w żaden sposób nie naruszają naszych zasad, ale model niepoprawnie je ocenił.

Nie zmienia to jednak faktu, że ocena wygenerowanej treści jest dobrym sposobem na zwiększenie stabilności działania aplikacji. Może być wykorzystywana nie tylko w kontekście bezpieczeństwa, ale także samej oceny rezultatów zwróconych przez model. Jak powiedziałem — **łatwiej jest oceniać treść, niż ją generować.** W rezultacie możemy w ten sposób wspierać rozumowanie modelu.

Nim przejdziemy dalej dodam, że w prompcie oceniającym, bardzo wskazane jest dodanie przestrzeni na "zastanowienie się". Możemy to zrobić albo poprzez oczekiwanie formatu JSON, albo poprzez format widoczny poniżej. Polega on na zastosowaniu tagów `<thinking>` oraz `<result>`, w których model może wpisać oczekiwaną treść, a następnie z pomocą wyrażenia regularnego możemy pobrać rezultat.

![](https://cloud.overment.com/2024-09-12/aidevs3_thinking-a1f4a662-0.png)

W bloku `<thinking>` model generując uzasadnienie, stopniowo **zwiększa prawdopodobieństwo tego**, że kolejne tokeny będą wygenerowane zgodnie z naszymi zasadami. Jest to jedna z najlepszych technik wzmacniania rozumowania modelu, szczególnie gdy połączymy ją z oceną rezultatu. Trzeba tylko zadbać o to, aby "pokazać modelowi jak ma myśleć", czyli przedstawić kilka przykładów zawartości bloku "thinking". W przeciwnym razie zwykle wygeneruje tam mało wartościową treść.
## Wydajność działania modeli
Jeszcze jakiś czas temu, LLM stanowiły najwolniejszy element aplikacji, co było dużym ograniczeniem. Natomiast obecnie zaczyna się to zmieniać z przynajmniej dwóch powodów — rozwoju małych modeli zdolnych do działania na urządzeniach mobilnych oraz rozwoju sprzętu do inferencji oferowanych przez platformy takie jak Groq czy [Cerebras](https://cloud.cerebras.ai/). Niestety żadna z nich nie posiada jeszcze planu możliwego do kupienia na stronie.

W repozytorium [LLMPerf Leaderboard](https://github.com/ray-project/llmperf-leaderboard?tab=readme-ov-file) prowadzone są statystyki na temat popularnych platform cechujących się szybkością inferencji. Jednak równie ważnym wskaźnikiem jest `time to first token`, czyli czas reakcji. Poza tym, część z tych usług narzuca także dość agresywne limity, co również negatywnie przekłada się na czas wykonywanych zadań.

W jednym z początkowych przykładów materiału wdrożeniowego o nazwie "completion" analizowaliśmy kilka zadań pod kątem nadania im etykiet. W celu optymalizacji czasu realizacji wszystkie klasyfikacje zostały uruchomione równolegle. Takie podejście faktycznie zwiększa wydajność aplikacji, lecz naraża nas na przekroczenie limitów zapytań oraz limitu przetworzonych tokenów w czasie.

![](https://cloud.overment.com/2024-09-12/aidevs3_parallel-c0b64d59-7.png)

Limity zwykle są znacznie większe w przypadku mniejszych modeli, które także działają zdecydowanie szybciej niż mocniejsze wersje. Dlatego w kontekście optymalizacji wydajności aplikacji, warto zadać sobie pytania takie jak:

- Jak możemy zaprojektować logikę, aby realizować jak najwięcej zapytań równolegle?
- Czy możemy skorzystać z mniejszego, szybszego modelu, nawet kosztem bardziej obszernych promptów?
- Czy możemy skorzystać z mechanizmu cache'owania promptu w celu zmniejszenia czasu reakcji (np. w przypadku modeli Anthropic)?
- Czy możemy skorzystać z platform oferujących szybką inferencję?
- Czy w ogóle będzie zależało nam na wydajności, bo np. część z zadań może być realizowana w tle?
- Czy wszystkie z zadań musi realizować model i czy możemy przynajmniej część logiki, przenieść na kod (np. przez wyrażenia regularne)?

Na koniec warto dodać, że szybkość inferencji wzrasta z czasem. Możliwe jest jednak, że będziemy obserwować cykle, w których nowe modele będą wolniejsze, a czasem będą optymalizowane i ich szybkość wzrośnie. Choć poniższy obraz może nie w pełni oddawać stanu faktycznego, z pewnością wizualizuje ostatnie lata rozwoju dużych modeli językowych.

![](https://cloud.overment.com/2024-09-12/aidevs3_cycles-8eebe210-4.png)
## Modele niecenzurowane
Duże modele językowe domyślnie posiadają szereg ograniczeń i limitów, które nie wynikają z ich natury, lecz działań podjętych przez ich twórców w związku z bezpieczeństwem. Takie ograniczenia obecne są także w modelach Open Source, jednak wśród nich powstaje grupa modeli `uncensored`, które wspomnianych ograniczeń nie posiadają lub łatwo można je ominąć. Przykładem takich modeli może być Dolphin tworzony na podstawie innych modeli (np. Llama czy Mistral) przez firmę [Cognitive Computations](https://x.com/cognitivecompai) lub Grok tworzony przez [x.ai](https://x.ai/).

Modele niecenzurowane mogą kojarzyć się ze zdolnością do generowania treści powszechnie uznawanych za niewłaściwe lub odpowiadanie na pytania mogą ce stanowić zagrożenia z punktu widzenia bezpieczeństwa. Jest to prawda, ale też samo cenzurowanie może wchodzić w obszary, które będziemy chcieli zaadresować, nie mając przy tym złych intencji. Nietrudno się domyślić, że temat niecenzurowanych modeli sam w sobie jest kontrowersyjny i [warto zapoznać się z perspektywą osoby stojącej za serią modeli Dolphin](https://erichartford.com/uncensored-models).

Poniżej mamy różnicę w zachowaniu modelu `Claude 3.5 Sonnet` oraz `dolphin-llama3:70b`. W przypadku tego pierwszego, wygenerowanie konwersacji pomiędzy dwójką polityków zakończyło się odmową, a ten drugi nie miał z tym problemu.

![](https://cloud.overment.com/2024-09-12/aidevs3_censored-fd00752d-b.png)

![](https://cloud.overment.com/2024-09-12/aidevs3_uncensored-3ca3b75d-d.png)

W tej chwili może nasunąć się tutaj na myśl problem botów szerzących dezinformację w Internecie czy oszukujących ludzi w wiadomościach prywatnych. Są to realne zagrożenia, których w jakimś stopniu doświadcza każdy.

Z drugiej strony są sytuacje biznesowe, które domyślnie nie będą mogły być zaadresowane przez cenzurowane modele. Przykładem może być korekta książek z kategorii kryminałów lub thrillerów, w których można natrafić na zwroty i opisy scen, które są blokowane przez chociażby Moderation API.

Oczywiście, warto zachować rozsądek i odpowiedzialnie pracować z modelami niecenzurowanymi. W przypadku modeli komercyjnych większość niepożądanych treści jest blokowana, a tutaj sami musimy o to zadbać.

Jeśli chodzi o samo uruchomienie modeli takich jak Dolphin, obecnie są one dostępne przez ollama oraz Hugging Face, i praca z nimi nie różni się od pozostałych modeli. Wyjątek stanowi prompt systemowy, który powinien podkreślać dopuszczanie wybranych zachowań, w tym także sposób wypowiedzi.
## Podsumowanie
Na przestrzeni ostatnich kilkunastu miesięcy, możliwości dużych modeli językowych stale wzrastały, albo w wyniku pojawiających się nowych wersji, albo ze względu na nowe techniki projektowania promptów. Podobnie też zwiększały się różne parametry, takie jak limit okna kontekstu czy liczba generowanych tokenów.

Faktycznie trudno jest porównywać komfort pracy z modelami, pomiędzy tym, co mamy teraz, a tym czego doświadczaliśmy rok czy dwa lata temu. Pomimo tego, dzisiejsza lekcja pokazała nam, że ograniczenia dalej istnieją, a część z nich sami będziemy chcieli utrzymać. Zatem podsumowując temat ograniczeń:

- Monitorowanie aplikacji, przetworzonych tokenów oraz kosztów jest **krytyczne** zarówno z technologicznego, jak i biznesowego punktu widzenia
- Kontrolowanie liczby tokenów dla przetwarzanej treści, a także limitu zapytań, również pozwoli nam uniknąć niepotrzebnych kosztów. Tutaj mowa o korzystaniu z `tokenizera` z ustawieniami dla aktualnego modelu
- Limity platform (szybkość, rate limit, czas reakcji, stabilność) stanowią ogromny problem na produkcji. I choć sytuacja poprawia się z miesiąca na miesiąc, należy już na początkowym etapie uwzględnić ją w swoim planie
- Moderacja treści trafiających do modelu oraz treści generowanych przez model, to proces który nie zapewnia 100% bezpieczeństwa i przewidywalności, lecz znacząco poprawia jakość działania aplikacji
- Optymalizacja wydajności aplikacji wiąże się ze zmianami projektowymi, dzięki którym zapytania do modelu będą wykonywane równolegle, bądź w tle.
- Nie wszystkie zadania musimy realizować z pomocą najlepszego modelu
- Nie wszystkie zadania wymagają zaangażowania **jakiegokolwiek modelu**

Jeśli z tej lekcji masz zrobić tylko **jedną rzecz**, to zapoznaj się z filmem na temat LangFuse i uruchom przykład o tej samej nazwie (`langfuse`) na swoim komputerze.

-----
tags:

- lesson
-----
![](https://cloud.overment.com/S01E04-1730930695.png)

Optymalizacja kodu aplikacji jest ważna, ale często pomijana, ponieważ w małych projektach zazwyczaj nie odgrywa kluczowej roli. W przypadku promptów jest nieco inaczej, ponieważ tutaj nawet proste zadania mogą być błędnie wykonane w wyniku braku precyzji. Co ciekawe, mowa tutaj nie tylko o precyzji samego promptu, ale także logiki zapisanej w kodzie.

W przykładzie `files` omawianym w lekcji S01E02 — Kontekst stworzyliśmy poniekąd imponujący mechanizm dynamicznego budowania pamięci. Wystarczy jednak kilka zapytań, aby przekonać się, że brakuje w nim wielu funkcjonalności, a użyteczność samego narzędzia jest dość ograniczona. Dlatego w tej lekcji, przesuniemy nieco granicę tego, co jest możliwe, omawiając przykład `memory`, który tylko pozornie realizuje podobne zadanie, co przykład `files`.

W lekcji S00E04 — Programowanie pisałem, że prompty w kodzie aplikacji niemal zawsze składają się z kilku dynamicznych sekcji, co utrudnia ich podgląd i debugowanie. Dlatego przeszliśmy też przez konfigurację LangFuse, po które teraz także sięgniemy. Poza nim, praktyczne zastosowanie znajdzie także PromptFoo (lub alternatywne narzędzie do ewaluacji promptów).

O Prompt Engineeringu można pisać dużo teorii. Techniki takie jak Few-Shot, Chain of Thought czy Tree of Thoughts warto znać także od tej strony, ale na pewnym etapie i tak zderzymy się z koniecznością praktycznego zastosowania tej wiedzy. Same techniki nie są jednak wszystkim, ponieważ najwięcej pracy i tak będzie kosztować nas staranne opisanie instrukcji oraz dostarczenie jakościowych przykładów. Jeszcze jakiś czas temu cała ta praca musiałaby być wykonana bezpośrednio przez nas, jednak od teraz chciałbym, aby praktycznie **w każdej sytuacji towarzyszył nam duży model językowy**, a nasza rola przechodziła bardziej w rolę architekta czy architektki.

To, o czym teraz piszę, ma swoje uzasadnienie w publikacjach takich jak [Large Language Models as Optimizers](https://arxiv.org/abs/2309.03409) oraz [Large Language Models Are Human-Level Prompt Engineers](https://arxiv.org/abs/2309.03409), a także wynika bezpośrednio z mojego doświadczenia. Choć trudno jest obecnie mówić o tym, że proste zapytanie do modelu (Completion) jest w stanie wygenerować bezbłędny rezultat, nawet w przypadku modeli o1, to bez wątpienia są one w stanie skutecznie nas wspierać. Może to odbywać się albo w bezpośredniej interakcji, albo przez częściowo autonomiczne narzędzia, które zresztą będziemy jeszcze budować.

Poniżej mamy fragment wspomnianej publikacji, prezentujący koncepcję Meta Promptu, z pomocą którego możemy optymalizować inne prompty.

![](https://cloud.overment.com/2024-09-14/aidevs3_llm_optimizers-7a40ff51-b.png)

Na podobnej zasadzie możemy debugować istniejące prompty, generować przykłady Few-Shot czy zestawy testowe na potrzeby ewaluacji.

To wszystko nie zastępuje jednak naszego własnego umysłu, który jest nadal niezbędny do nadawania kierunku, ustalania ścieżek czy narzucania ograniczeń. Dlatego zacznijmy od ogólnej koncepcji przedstawionej w przykładzie `memory` oraz tym, on w zasadzie działa.

<div style=padding:56.25% 0 0 0;position:relative;><iframe allow=autoplay; fullscreen; picture-in-picture; clipboard-write frameborder=0 src=https://player.vimeo.com/video/1009451739?badge=0&autopause=0&player\_id=0&app\_id=58479 style=position:absolute;top:0;left:0;width:100%;height:100%; title=01\_04\_memory></iframe></div><script src=https://player.vimeo.com/api/player.js></script>

Logika przykładu `memory` układa się następująco:

1. Na podstawie treści konwersacji, asystent zadaje sobie serię pytań, które są zostają wykorzystane w celu przeszukania pamięci. Ważne jest to, że **zapytania te, nie są generowane wyłącznie na podstawie ostatniej wiadomości**, co pozwala na utrzymanie kontekstu. Np. jeśli rozmowa prowadzona jest na temat "Dużych Modeli Językowych", to asystent wielokrotnie będzie wczytywał sobie informacje na ich temat. Stwarza to nam przestrzeń do optymalizacji, chociażby poprzez wprowadzenie pamięci tymczasowej, przez co te same wspomnienia nie będą musiały być wczytywane za każdym razem.
1. Następnie z pomocą Vector Store odnajdywane są wspomnienia pasujące do wyżej wygenerowanych zapytań. Na tym etapie są one także filtrowane, ale i tak docelowo moglibyśmy analizować je z pomocą modelu, aby upewnić się, że do głównego kontekstu trafią faktycznie tylko te, które są istotne w danym momencie konwersacji.
1. Po wczytaniu wspomnień, asystent decyduje o tym, czy powinien się czegoś nauczyć. Pod uwagę brane są tutaj wszystkie posiadane informacje oraz przede wszystkim **polecenie użytkownika**, który musi wyraźnie podkreślić chęć zapisania danych. Domyślnie może dojść tutaj do pomyłki, ze względu na to, że odpowiedzialność leży po stronie modelu. Możliwe jest jednak z modyfikowanie logiki aplikacji tak, aby użytkownik mógł np. z pomocą interfejsu potwierdzić zapisanie wspomnienia.
1. W przypadku, gdy istnieje potrzeba zapamiętania informacji, asystent bierze pod uwagę wspomnienia wczytane w punkcie `2` i podejmuje decyzję o dodaniu/aktualizacji/usunięciu danych. Tutaj warto zaznaczyć, że skuteczność organizacji będzie zależeć od skuteczności odnajdywanych informacji.
1. No i ostatecznie zgromadzone dane trafiają do głównego promptu, który generuje odpowiedź przekazywaną do użytkownika.

Cały schemat interakcji prezentuje się następująco (poniższą grafikę można otworzyć w nowej karcie, aby była bardziej czytelna).

![](https://cloud.overment.com/2024-09-14/aidevs3_memory_map-f6f865e6-0.png)
## Kilka słów o embeddingu i vector store
Jeśli pracujesz już z bazami wektorowymi, możesz pominąć ten akapit.

Dotychczas w przykładach pojawiał się temat vector store lub baz wektorowych oraz embeddingu. Choć będziemy o nim jeszcze mówić, to już teraz zrobimy małe wprowadzenie. Sam temat baz wektorowych można zrozumieć znacznie lepiej, gdy nazwiemy je po prostu **silnikami wyszukiwania**, podobnymi do ElasticSearch czy Algolia. Jednak tutaj zamiast szukać dopasowanych sposobem zapisu, szukamy fraz podobnych pod kątem znaczenia. Np. podobny zapis to `król`, `królowa` a podobne znaczenie to `król` i `mężczyzna` oraz `królowa` i `kobieta`.

Znaczenie słów opisuje się z pomocą modeli generujących tzw. embedding, czyli zestaw liczb (wektorów) reprezentujących różne cechy treści. W naszych przykładach korzystamy z modelu `text-embedding-3-large` od OpenAI, jednak już teraz jest istnieją znacznie lepsze modele, wymienione na [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard). W zależności od zastosowania (np. pracy z językiem polskim) mogą sprawdzić się inne modele. Co więcej, w przypadku nowych słów (np. projektu Tech•sistence), model może mieć trudność w opisaniu ich znaczenia i trzeba o tym pamiętać oraz stosować wyszukiwanie hybrydowe.

![](https://cloud.overment.com/2024-09-14/aidevs3_meaning-8c93c129-0.png)

W każdym razie, aby wyszukiwanie z pomocą embeddingu było możliwe, w pierwszej kolejności wpisy z naszej bazy muszą zostać zamienione na embedding i przechowane w bazie wektorowej lub klasycznej bazie dostosowanej do obsługi takiego formatu danych.

Następnie, aby wyszukać informacje, musimy zamienić wyszukiwanie na embedding. Tylko wtedy możemy porównać jego znaczenie z danymi przechowywanymi w bazie wektorowej i pobrać te o najbliższym podobieństwie znaczeniowym. Mechanizm ten widać wyraźnie poniżej. Zapytanie "Play Music" zostało zamienione na embedding `[0.2, ...]`, a najbardziej zbliżona do niego jest informacja o Spotify (`[0.3, ...]`).

![](https://cloud.overment.com/2024-09-15/aidevs3_vector-c536e191-2.png)

No i przenosząc to na przykład `memory`, z treści konwersacji LLM generuje zapytania, które zamieniamy na embedding, a następnie przeszukujemy vector store "`faiss`". Wewnątrz niego przechowujemy wyłącznie identyfikatory plików (`uuid`), dzięki którym możemy wczytać faktyczną treść plików.
## Generowanie promptów
W przykładzie `memory` w pliku `prompts.ts` znajduje się kilka rozbudowanych promptów. Każdy z nich na tym etapie można uznać za szkic lub po prostu pierwszą wersję zdolną do realizowania początkowych założeń z pomocą modelu GPT-4o. Prompty napisałem z pomocą LLM oraz specjalnego meta promptu podobnego do tego, który udostępniałem w lekcji S00E02 — Prompt Engineering. Natomiast teraz, przyjrzymy się temu nieco bliżej.

Na początek trzeba zaznaczyć, że obecnie duże modele językowe posiadają już wiedzę na temat popularnych technik projektowania promptów. Co więcej, potrafią wykorzystać ją w praktyce oraz łączyć z bogatym słownictwem i rozległą wiedzą na różne tematy. Jakiś czas temu pojawił się nawet przeciek jednego z promptów stosowanych przez Apple, który zawierał fragment "don't hallucinate". Został on dość szeroko skomentowany, głównie negatywnie, aczkolwiek pojawiły się także wypowiedzi o tym, że [może być w tym sens.](https://x.com/benhylak/status/1820894401834741912).

![Duże modele językowe mają już wiedzę o projektowaniu promptów, np. CoT](https://cloud.overment.com/2024-09-14/aidevs3_cot-5887cbb9-4.png)

Wracając do meta promptu, możesz pobrać go [tutaj](https://cloud.overment.com/AI_devs-3-Prompt-Engineer-1726336422-1726339115.md). W związku z tym, że jest on dostosowany do moich potrzeb, omówimy teraz jego poszczególne fragmenty.

W pierwszej części standardowo nadajemy rolę (Prompt Engineer) i zawężamy kontekst, wspominając o "Large Language Models", dzięki czemu nie ma tutaj mowy o dwuznaczności tematu. Zaraz po tym, znajduje się sekcja `<objective>` określająca główne przeznaczenie promptu. Jej położenie nie jest przypadkowe, ponieważ LLM mają tendencję do przykładania większej uwagi do instrukcji znajdujących się na początku i końcu promptu, co zostało opisane w [Lost in The Middle](https://arxiv.org/pdf/2307.03172). Choć od czasu publikacji tego dokumentu minęło już trochę czasu, a modele wykazują znacznie lepsze umiejętności przetwarzania kontekstu, to problem nadal występuje, o czym możemy przeczytać także w [A Challenge to Long-Context LLMs and RAG Systems](https://arxiv.org/pdf/2407.01370).

Po określeniu celu, mamy jeszcze sekcję zasad, czyli `<rules>` w której znajdują się precyzyjne wytyczne dotyczące sposobu generowania treści i prowadzenia interakcji. Obecnie nie wiadomo zbyt wiele na temat skuteczności pisania WIELKIMI literami wybranych słów kluczowych, ale można uznać je za istotne z punktu widzenia czytelności instrukcji.

Wśród zasad padają także określenia takie jak Chain of Thought czy zasady SMART, których celem jest aktywowanie obszarów modelu, powiązanych właśnie z tymi koncepcjami, o czym mówiliśmy przy okazji tematu `Latent Space`.

![](https://cloud.overment.com/2024-09-14/aidevs3_meta_1-b4834a43-7.png)

Kolejnym fragmentem promptu jest seria kroków czy też elementów procesu kształtowania promptu, które spisałem na podstawie swoich własnych doświadczeń. Ich obecność w meta prompcie jest po to, aby model prowadził mnie przez niego za każdym razem gdy pracujemy nad nową instrukcją. Oczywiście część z tych kroków może być pominięta w trakcie rozmowy, lecz zwykle warto się przy nich na trochę zatrzymać, aby upewnić się, że wyraźnie podkreślamy wszystkie istotne punkty nowego promptu.

![](https://cloud.overment.com/2024-09-14/aidevs3_meta_2-035a2fca-d.png)

W dalszej części mamy zestaw słów kluczowych oraz technik, których celem jest zwrócenie uwagi modelu na wybrane obszary wiedzy, takie jak zastosowanie popularnych modeli mentalnych czy unikanie błędów poznawczych. Umieszczenie ich wewnątrz meta promptu zwiększa szansę, że zostaną one wykorzystane podczas rozmowy na temat kształtowania czy optymalizacji nowych instrukcji.

![](https://cloud.overment.com/2024-09-14/aidevs3_meta_3-acf500bc-2.png)

No i ostatecznie mamy także ogólny szablon promptu, uwzględniający różne sekcje oraz szkicujący sposób prezentowania przykładów Few-Shot. Na uwagę zasługuje początek i koniec tej sekcji, ponieważ zastosowałem tu **inny separator w postaci ### oraz wielkich liter**. Powodem jest fakt, że nie mogłem już skorzystać z tagów takich jak `<objective>`, ponieważ korzystam z nich już w samym meta prompcie oraz prezentowanym szablonie. Inny separator pozwala na **odróżnienie** treści.

![](https://cloud.overment.com/2024-09-14/aidevs3_meta_4-3c82b7ad-c.png)

Raz jeszcze, link do powyższego promptu znajduje się [tutaj](https://cloud.overment.com/AI_devs-3-Prompt-Engineer-1726336422-1726339115.md). Samo korzystanie z niego polega po prostu na ustawieniu go jako wiadomość systemowa, a następnie zarysowaniu celu nowego promptu, który chcemy stworzyć. Wówczas model poprowadzi nas przez cały proces, krok po kroku.

Powyższy meta prompt pełni niezwykle istotną rolę i nie chodzi w niej o szybsze generowanie nowych promptów, lecz **staranne iterowanie wspólnie z modelem kolejnych wersji instrukcji** oraz **dostrzeganie detali i zależności**, które nierzadko trudno jest nam zauważyć. Mówi się też, że duże modele językowe nie są kreatywne i jedynie odtwarzają treści z danych treningowych. Wystarczy jednak zbudować wspólnie z nimi kilka promptów, aby przekonać się, że potrafią nas zaskoczyć i myślę, że już niebawem będziemy to obserwować.

**WAŻNE:** Celem meta prompt **nie jest** generowanie promptu dla nas, lecz wspólnie z nami. Cały czas główna część pracy leży po naszej stronie.
## Debugowanie promptu
Gdy czytasz te słowa, przykład `memory` znajduje się na etapie w którym realizuje podstawowe założenia związane z organizacją informacji. Zatem po stronie mechaniki, wszystko wygląda w porządku, jednak nie wiem jeszcze jak wypadnie w praktyce. Wystarczyło jednak przesłanie kilku linków, aby zobaczyć, że prompt odpowiedzialny za ich organizację, nie działa zgodnie z moimi oczekiwaniami i niepoprawnie umieszcza wspomnienia w ramach poniższej struktury (źródło: `/memory/prompts.ts`)

![](https://cloud.overment.com/2024-09-15/aidevs3_mind-be1e1739-5.png)

Prośba o zapisanie linku do projektu [heyalice.app](https://heyalice.app) zakończyła się utworzeniem notatki w kategorii `resources -> documents`, a nie `resources -> websites`.

![](https://cloud.overment.com/2024-09-15/aidevs3_categorization-40ba59c4-5.png)

Co więcej, logi LangFuse wyraźnie sugerują, że na etapie zapisywania wspomnienia, wygenerowana wiadomość użytkownika **wskazuje poprawną kategorię**! Pomimo tego, model zdecydował inaczej, co nie jest zrozumiałe.

![](https://cloud.overment.com/2024-09-15/aidevs3_request-b5a92d3e-d.png)

Skorzystałem więc z odpowiednika OpenAI Playground dostępnego w LangFuse, aby wysłać kolejną wiadomość oznaczoną jako "System Check" z prośbą o wyjaśnienie decyzji. W odpowiedzi otrzymałem uzasadnienie, w którym model uznał kategorię `notepad` za bardziej pasującą do wskazanego zasobu. Oczywiście, ze względu na sposób działania LLM, nie mówimy tutaj o 100% pewności, że wskazany przez model powód jest tym, którego szukamy, ale możemy uznać go za wskazówkę.

![](https://cloud.overment.com/2024-09-15/aidevs3_ask-cce30cad-3.png)

Mamy teraz kilka opcji, które możemy wziąć pod uwagę:

- Zadać pytania pogłębiające, które mogą naprowadzić nas na kolejne problemy promptu lub nowe pomysły dotyczące jego dalszej iteracji.
- Przeanalizować prompt samodzielnie, szczególnie pod kątem brakujących danych, dwuznacznych instrukcji czy nawet kolejności zapisu poszczególnych sekcji.
- Rozbić zadanie na mniejsze kroki, uwzględniając np. wcześniejsze zastanowienie się nad organizacją wspomnień.
- Dać więcej czasu "na myślenie" przez generowanie właściwości "thinking", umieszczanej na pierwszym miejscu struktury obiektu JSON.
- Wprowadzić zmiany wspólnie z modelem.

Zobaczmy więc, jak z optymalizacją promptu może nam pomóc sam model.
## Optymalizacja z pomocą modelu
Wiemy, że model domyślnie podąża za instrukcjami zawartymi w prompcie oraz wiadomościami użytkownika. Pomimo tego możliwe jest omówienie promptu, poprzez wcześniejsze uprzedzenie modelu o tym fakcie. Może to mieć formę wiadomości widocznej poniżej lub sytuacji, w której najpierw wymieniamy z modelem kilka wstępnych informacji, a dopiero potem przechodzimy do promptu.

![](https://cloud.overment.com/2024-09-15/aidevs3_work-2f9301b7-5.png)

Gdy prompt znajduje się już w konwersacji, a model poprawnie na niego reaguje, to możemy przejść do wprowadzenia zmian poprzez opisanie problemu i zasad dalszej współpracy. Poniżej widać jak przedstawiam problem oraz sugeruję zmiany dotyczące procesu rozumowania i struktury wypowiedzi, prosząc przy tym o dodanie właściwości `_thinking`.

![](https://cloud.overment.com/2024-09-15/aidevs3_refining-07aa5f98-1.png)

W ten sposób model wygenerował mi kolejną wersję promptu. Natomiast proces optymalizacji ma charakter iteracyjny i nie wystarczyła jedna wiadomość, aby rozwiązać wszystkie problemy. Każdą z kolejnych sugestii przeglądałem od początku do końca, prosząc o kolejne poprawki **lub wprowadzałem je samodzielnie**. Następnie testowałem prompt i sprawdzałem zachowanie aplikacji.

Mówimy tutaj o dość prostym mechanizmie, z którego nie korzystają inni użytkownicy. Nie mamy więc problemu z tym, aby wprowadzać w nim nawet bardzo duże zmiany, ale nie zawsze będziemy mieć taki komfort.

Dalsze debugowanie aplikacji doprowadziło mnie do wniosku, że konieczne jest zmodyfikowanie struktury pamięci oraz uzupełnienie opisów, aby trudno było je ze sobą pomylić. Nawet wspomniana różnica pomiędzy `resources -> documents` a `resources -> websites` nie była oczywista dla modelu. W związku z tym zmieniłem nazwę `documents` na `files` i wspólnie z modelem o1-preview kilkukrotnie przeszliśmy przez nową wersję struktury pamięci.

![](https://cloud.overment.com/2024-09-15/aidevs3_ambiguity-aa9030ed-4.png)

Nie ulega wątpliwości, że model językowy nie jest w stanie samodzielnie rozwiązać problemów związanych z działaniem promptu, szczególnie gdy nie ma punktu odniesienia w postaci zestawu danych testowych oraz feedbacku ze strony aplikacji. Jednak wartość umiejętności modelu przy współpracy z człowiekiem jest niepodważalna.
## Kompresja promptu
To samo zdanie można wyrazić na różne sposoby, używając więcej lub mniej słów. W przypadku promptu jest to istotne z uwagi na tokeny i zarządzanie uwagą modelu. Podobnie jak przy tworzeniu promptu czy analizie jego działania, w parafrazie i kompresji instrukcji możemy korzystać z umiejętności modelu językowego. Więcej na ten temat można przeczytać w [LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models](https://arxiv.org/abs/2310.05736) lub po prostu skorzystać z omawianego w tej publikacji narzędzia [LLMLingua](https://github.com/microsoft/LLMLingua).

W repozytorium tego projektu znajduje się poniższa grafika, obrazująca proces kompresji, polegający w dużej mierze na usunięciu słów, które nie mają znaczenia z punktu widzenia samej treści.

![](https://cloud.overment.com/2024-09-15/aidevs3_compression-5eb423a4-d.png)

Moje doświadczenie z tym narzędziem sugeruje, że **automatyczna kompresja promptu daje umiarkowane rezultaty**, ale stanowi dobre źródło informacji na temat tego, co potencjalnie możemy usunąć. Tutaj także mamy przestrzeń do tworzenia meta promptów zdolnych do skutecznej kompresji.

Kompresja promptów wydaje się mieć umiarkowane znaczenie, biorąc pod uwagę rosnące limity okna kontekstu czy cache'owanie promptu. Natomiast już teraz sami widzimy, że złożone modele mają problem z podążaniem za złożonymi instrukcjami, które także **szybko stają się mało zrozumiałe także dla ludzi**.

W temacie kompresji, pod uwagę możemy brać:

- Zastępowanie obszernych, złożonych promptów, na mniejsze, bardziej wyspecjalizowane akcje, które będą uruchamiane warunkowo, w zależności od sytuacji.
- Opisywanie wybranych zachowań modelu z pomocą pojedynczych słów bądź wyrażeń, a nie pełnych zdań. Przykładowo określenie "U**se first-principles thinking**" wskazuje na zrozumiałą dla modelu językowego koncepcję rozumowania, poprzez rozbicie zagadnienia na czynniki pierwsze.
- Zmianę języka promptu oraz kontekstu, np. z polskiego na angielski
- Usuwanie wybranych fragmentów promptu, które opisują naturalne zachowanie modelu (np. sposób formatowania wypowiedzi) i tym samym nie wnoszą nic nowego. Co więcej, takie instrukcje mogą **ograniczać model**, zmniejszając jego skuteczność

Podobnie jak w przypadku optymalizacji promptu pod kątem skuteczności, możemy przedyskutować z modelem temat kompresji. Poniższą rozmowę przeprowadziłem z modelem o1-preview, który już w pierwszej turze zwrócił mi wyczerpujący raport oraz sugestię nowej wersji promptu.

![](https://cloud.overment.com/2024-09-15/aidevs3_optimize-22e0c2ad-b.png)

![](https://cloud.overment.com/2024-09-15/aidevs3_optimization-0c4963b9-0.png)

Większość zasugerowanych zmian była bardzo trafna i zwracała uwagę na zbyt ogólne instrukcje lub fragmenty dotyczące tych samych zachowań. Wśród sugestii pojawiły się także takie, które nie były zgodne z moimi założeniami, więc po prostu je pominąłem. Efekt pracy widać poniżej — redukcja z 2095 do 803 tokenów przy zachowaniu oczekiwanej skuteczności.

![](https://cloud.overment.com/2024-09-15/aidevs3_uncompressed-216b3e0d-4.png)

![](https://cloud.overment.com/2024-09-15/aidevs3_compressed-77fdaf30-a.png)

Proces kompresji promptu będzie różnił się w zależności od sytuacji i nie będzie on jednorazowy. Podczas wprowadzania kolejnych modyfikacji, szybko dojdziemy do momentu w którym prompt ponownie zwiększy swoją objętość i będzie wymagał poprawy.
## Optymalizacja wypowiedzi modelu
Koszt liczby wygenerowanych tokenów jest większy niż koszt tokenów przesłanych do modelu. Oczywiście tych drugich niemal zawsze jest zdecydowanie więcej, jednak i tak większy wpływ na ceny oraz szybkość działania aplikacji mają tokeny wyjściowe.

![](https://cloud.overment.com/2024-09-15/aidevs3_pricing-bc448bed-9.png)

Tak wygląda rozkład tokenów `input -> output` dla kilku ostatnich zapytań mojego systemu. Wypowiedź tokenu stanowi ~5% wszystkich przetworzonych tokenów. Jeśli weźmiemy pod uwagę szybkość inferencji, o której mówiliśmy w lekcji S01E03 — Limity, to od razu jasna stanie się chęć dążenia **do możliwie krótkiej i/lub precyzyjnej wypowiedzi modelu.**

![](https://cloud.overment.com/2024-09-15/aidevs3_inputoutput-bb3f2e00-1.png)

Dobrym przykładem jest właściwość `_thinking`, która pojawia się w moich promptach jako pierwsza właściwość generowanego obiektu JSON. W ten sposób stwarzam modelowi przestrzeń na zastanowienie się nad tym, jak mają wyglądać kolejne właściwości zwracanego obiektu.

Jeśli nasza instrukcja w tej sytuacji będzie sugerować modelowi wyłącznie "zastanowienie się", to z dużym prawdopodobieństwem otrzymamy rozbudowaną treść o wątpliwej wartości. Jednak gdy wskażemy schemat myśli lub listę pytań, na które model musi odpowiedzieć, jakość wypowiedzi znacznie wzrośnie.

![](https://cloud.overment.com/2024-09-15/aidevs3_output-a0be0809-b.png)

Powyższa instrukcja opisująca proces zastanawiania się daje świetny rezultat, ponieważ model wymienia słowa kluczowe, których obecność przyczynia się do wyższej jakości generowanych zapytań w tablicy `q` (queries).

![](https://cloud.overment.com/2024-09-15/aidevs3_reason-f7daba9b-8.png)

Styl wypowiedzi nie tylko określony jest w szablonie, ale także zastosowany w przykładach Few-Shot. Dzięki temu model faktycznie podąża za naszą instrukcją, szczególnie na początku swoich wypowiedzi. W dłuższych konwersacjach często zauważalna jest tendencja do powrotu do "naturalnego" dla modelu stylu.

Jednym z rozwiązań tego problemu jest utrzymywanie możliwie krótkich instrukcji oraz liczby wiadomości konwersacji, które mogą być przechowywane jedynie w formie podsumowania, o czym mówiliśmy w lekcji S00E04 — Programowanie
## Fine-tuning
Zachowanie modelu może być dopasowane nie tylko poprzez instrukcje czy dostarczony kontekst, ale także proces fine-tuningu dzięki któremu możemy wyspecjalizować model w określonym zadaniu. Fine-tuning nie powinien być jednak postrzegany jako alternatywa dla sterowania modelem z pomocą promptów, ale uzupełnienie tego procesu.

Poniższy przykład "technik optymalizacji" pochodzi z nagrania [A Survey of Techniques for Maximizing LLM Performance](https://www.youtube.com/watch?v=ahnGLM-RC1Y) udostępnionego przez OpenAI. Pokazuje on dwa rodzaje optymalizacji — **zachowania** i **wiedzy**.

![](https://cloud.overment.com/2024-11-01/aidevs3_optimize-a486ea6d-5.png)

Logika aplikacji może zatem składać się zarówno z serii promptów realizowanych przez model taki jak GPT-4o, ale poszczególne etapy mogą być obsługiwane przez model wyspecjalizowany w tym zadaniu.

W przypadku OpenAI obecnie proces fine-tuningu może być wykonany bezpośrednio w panelu [platform.openai.com](https://platform.openai.com/finetune) i nie jest to skomplikowane. Sama trudność tego zadania polega na dobraniu odpowiednich zestawów danych treningowych oraz danych testowych, a następnie samej ewaluacji modelu. Dane te nierzadko będziemy generować z pomocą modelu (do czego wcześniej potrzebne będą nam prompty) lub będziemy przetwarzać dane bezpośrednio z naszej aplikacji (przy zachowaniu polityki prywatności).

Przez podstawowy proces fine-tuningu, który możesz zrealizować już teraz, przeprowadzi Cię Jakub na poniższym filmie:

<div style=padding:56.25% 0 0 0;position:relative;><iframe allow=autoplay; fullscreen; picture-in-picture; clipboard-write frameborder=0 src=https://player.vimeo.com/video/1025471081?badge=0&autopause=0&player\_id=0&app\_id=58479 style=position:absolute;top:0;left:0;width:100%;height:100%; title=fine-tuning-gpt4o-mini></iframe></div><script src=https://player.vimeo.com/api/player.js></script>
## Podsumowanie
Podsumowując dzisiejszą lekcję, w projektowaniu aplikacji wykorzystujących duże modele językowe szczególnie pomocne okazują się same modele. Jednak obecnie ich możliwości nie pozwalają na w pełni autonomiczne działanie bez jakiegokolwiek nadzoru człowieka. W zamian, możemy projektować narzędzia wyspecjalizowane w konkretnych obszarach. Przez narzędzia rozumiem **prompty, serie promptów lub częściowo autonomiczne systemy łączące logikę aplikacji z modelami**.

Po tej lekcji już raczej nie ma wątpliwości jak istotną rolę pełnią instrukcje dla modelu. Jednocześnie jasne jest, że nie chodzi tutaj wyłącznie o same prompty, ale także sposób ich organizacji w kodzie, a także sam kod. Bo nawet patrząc na przykład `memory` widzimy, jak istotną rolę odgrywa sposób kontrolowania przepływu danych pomiędzy promptami, ich monitorowanie oraz automatyczne testy.

Jeśli masz zrobić tylko jedną rzecz z tej lekcji, to zapoznaj się ze wspominanym meta promptem i po prostu zacznij z niego korzystać, a potem stopniowo zmieniaj go, dopasowując do swoich potrzeb. Bardzo dobrym pomysłem jest także przesłanie kilku zapytań do przykładu `memory` w celu zaobserwowania tego, jak zachowuje się model. Wiedza na ten temat z pewnością okaże się przydatna przy projektowaniu kolejnych narzędzi. Zachęcam więc do zapoznania się z poniższym filmem i przetestowania działania pamięci samodzielnie.

<div style=padding:75% 0 0 0;position:relative;><iframe allow=autoplay; fullscreen; picture-in-picture; clipboard-write frameborder=0 src=https://player.vimeo.com/video/1009759972?badge=0&autopause=0&player\_id=0&app\_id=58479 style=position:absolute;top:0;left:0;width:100%;height:100%; title=01\_04\_memory\_2></iframe></div><script src=https://player.vimeo.com/api/player.js></script>

Powodzenia!

-----
tags:

- lesson
-----
![](https://cloud.overment.com/2024-11-05/s01e05-e0bd2fa2-4.png)

Nie jest tajemnicą, że budowanie narzędzi na prywatne potrzeby, potrzeby wewnątrzfirmowe czy nawet początkowego etapu [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) różni się od produkcyjnych aplikacji. Różnica ta jest wyraźna już w klasycznych aplikacjach, które rozwijamy na co dzień. Natomiast generatywne AI to kolejny element, podnoszący poziom trudności.

Na temat limitów generatywnego AI mówiliśmy już całkiem dużo. Poruszaliśmy także możliwe rozwiązania częstych problemów i wciąż poznajemy nowe techniki pracy z modelami, a nawet narzucania na nie naszych własnych ograniczeń. Ostatecznie wiemy też, że niektóre problemy nie mają rozwiązania i mogą być zaadresowane jedynie poprzez **decyzję o tym, aby nie korzystać z modeli językowych** lub poprzez zmianę założeń projektu.

W tej lekcji porozmawiamy na temat pracy w środowisku produkcyjnym, przechodząc przez proces udostępnienia aplikacji na własnym serwerze. Jest to proces o tyle istotny, że pozwala nam na udostępnienie własnego API, z którym będą mogły kontaktować się zewnętrzne usługi.

**Ważne:** Jeśli posiadasz duże doświadczenie w pracy na back-endzie, to samodzielnie możesz przejść przez konfigurację własnego API na wybranym VPS. Dodatkowo zwróć uwagę na zagadnienia związane z LangFuse oraz Qdrant.
## Środowisko lokalne i produkcyjne
W związku z tym, że z LLM komunikujemy się poprzez API, samo udostępnienie aplikacji na serwerze produkcyjnym jest dość standardową procedurą. Potrzebujemy VPS (np. [Mikr.us](https://mikr.us/) czy DigitalOcean), domeny, serwera HTTP (np. [nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)), certyfikatu HTTPS (np. [Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04)), bazy danych (np. SQLite lub PostgreSQL) oraz bazy wektorowej (np. Qdrant). Dodatkowo, w celu optymalizacji procesu deploymentu, możemy zastosować [GitHub Actions](https://github.com/features/actions). Jest to typowy zestaw narzędzi, z którego sam korzystam produkcyjnie.

Aplikacja działająca w środowisku lokalnym/developerskim powinna możliwie najdokładniej odwzorowywać środowisko produkcyjne, uwzględniając w tym wersje narzędzi oraz zależności i strukturę bazy danych — to wszystko powinno być dla każdego jasne.

Różnice w środowisku lokalnym i produkcyjnym pojawiają się jednak w obszarach takich jak: **dane użytkowników**, **połączenia z API (np. tryby "sandbox" bądź oddzielne konta)**, a teraz także same **prompty**. Oznacza to, że w trzech obszarach **powiązanych z przetwarzaniem danych** mogą pojawić się niespójności.

![](https://cloud.overment.com/2024-09-16/aidevs3_prodlocal-6514d51a-1.png)

Temat danych użytkowników od dawna adresujemy poprzez dane syntetyczne, uzupełniane automatycznie w procesie seed'owania bazy. Czasem proces ten jest pomijany lub nie poświęca mu się zbyt dużo uwagi. Gdy dane przetwarzane są przez kod, nie zawsze stanowi to duży problem. Jednak w przypadku modeli językowych jest inaczej. Dlatego należy zadbać o to, aby **dane w lokalnej bazie danych możliwie jak najlepiej odwzorowywały dane produkcyjne** (z uwzględnieniem ich anonimizacji).

Źródłem danych są także zewnętrzne usługi, z którymi nasza aplikacja komunikuje się poprzez API. Przykładem mogą być narzędzia takie jak CMS, CRM, aplikacje do zarządzania zadaniami, pocztą e-mail czy dokumentami. W środowisku developerskim zwykle korzystamy z oddzielnych kont, na których również mogą znajdować się dane różne od produkcyjnych. Podobnie jak w przypadku baz danych, musimy dbać o to, aby różnice były możliwie jak najmniejsze. Tutaj rozwiązaniem jest **dbanie o odwzorowanie konfiguracji**. Przykładowo jeśli tworzymy narzędzie wspierające zarządzanie zamówieniami w systemie sprzedażowym, to konto testowe musi zawierać dokładnie te same kategorie, które pojawią się na głównym koncie.

Choć to wszystko brzmi jak coś oczywistego, to z własnego doświadczenia wiem, że mało jest projektów, które adresują te tematy od początku do końca. Z tego powodu zwracam na to uwagę, ponieważ wiąże się z tym dodatkowa praca, która ma znaczne przełożenie na proces rozwoju oprogramowania.

No i ostatecznie mamy także temat promptów, które stanowią część kodu źródłowego aplikacji, a ich modyfikacja w sposób nieoczywisty może wpłynąć na stabilność całego systemu. Wiemy już, że dzięki PromptFoo oraz LangFuse możemy rozwijać prompty w bardziej kontrolowany sposób, co staje się krytyczne, szczególnie podczas pracy w zespole. Jednak pojawia się tutaj także potrzeba rozwijania bazy zestawów danych testowych, zarządzanie wersjami promptów, wersjami samych modeli oraz związanymi z nimi kosztów.

W lekcji S01E03 — Limity mówiliśmy o limitach API platform udostępniających duże modele językowe. Nie wspomniałem tam jednak o roli limitów działających po stronie naszych aplikacji. O ich znaczeniu przekonaliśmy się sami, gdy jeden z naszych projektów został odpytany 500 000 razy. Dzięki mechanizmom [Cloudflare](https://www.cloudflare.com/) straty poniesione podczas tego ataku, **wyniosły ~20 groszy**. Bez tego mówilibyśmy raczej o kilku, kilkunastu tysiącach złotych.

O wszystkim, co właśnie powiedziałem, najlepiej przekonać się w praktyce. Dlatego przejdziemy teraz przez dwa scenariusze, które pozwolą nam na publiczne udostępnienie naszego API w dwóch wariantach — aplikacji hostowanej na naszym komputerze oraz wirtualnym serwerze prywatnym (VPS). Pierwszą z tych opcji trudno jest nazwać produkcyjną, lecz może sprawdzić się na własne potrzeby, szczególnie dla osób nieposiadających doświadczenia w pracy na back-endzie i obsłudze serwerów.
## Localhost dostępny w Internecie
W przykładzie external znajduje się prosta aplikacja umożliwiająca rozmowę z dużym modelem językowym, ale zawiera kilka dodatkowych detali, które do tej pory pomijaliśmy.

Przede wszystkim, w pliku middlewares.ts znajduje się funkcja limiter odpowiadająca za nakładanie limitów liczby zapytań. Po przekroczeniu **jednego zapytania na 10 sekund**, aplikacja zacznie zwracać poniższy błąd. Jest to prosta implementacja limitów, która docelowo powinna albo być zrealizowana przez Cloudflare, albo przez rozbudowany mechanizm uwierzytelnienia połączenia z danym użytkownikiem.

![](https://cloud.overment.com/2024-09-16/aidevs3_429-7b2386c4-e.png)

Dodatkowo dostęp do aplikacji jest zablokowany dla połączeń, które nie zawierają nagłówka Authorization ustawionego na wartość z pliku .env przypisaną do klucza PERSONAL\_API\_KEY. Inaczej mówiąc, nikt z zewnątrz nie będzie mógł skorzystać z naszej aplikacji.

![](https://cloud.overment.com/2024-09-16/aidevs_401-de209274-6.png)

Po uruchomieniu serwera poleceniem bun external, możemy skorzystać z narzędzi takich jak ngrok (bezpłatna wersja), [localcan](https://www.localcan.com/) (bezpłatny 7-dniowy trial) lub samodzielnej konfiguracji przekierowania. W przypadku tego pierwszego, udostępnienie aplikacji polega na uruchomieniu prostego polecenia ngrok http localhost:3000, a następnie przejścia na adresu z wiersza Forwarding. Oczywiście w przypadku bezpłatnego planu adres ten będzie generowany na nowo po każdym uruchomieniu, więc warto rozważyć wykupienie płatnego planu.

![](https://cloud.overment.com/2024-09-16/aidevs3_ngrok-5e61f19c-e.png)
## Konfiguracja VPS
**WAŻNE:** Konfiguracja własnego serwera **nie jest wymagana w AI\_devs 3**, ale poruszamy ten temat, ponieważ bardzo przydatne jest posiadanie zdalnego dostępu do narzędzi, które projektujemy. Możesz więc pominąć ten krok i opierać się na wspomnianym wyżej ngrok.

Na początku dzisiejszej lekcji linkowałem wpisy do poradników z DigitalOcean na temat konfiguracji serwera. Mowa konkretnie o:

- [Konfiguracja Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)
- [Konfiguracja Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-22-04)
- [Konfiguracja Node.js](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04)
- [Konfiguracja PostgreSQL (opcjonalnie)](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)

Sam korzystam z powyższych wpisów przy ustawianiu własnych serwerów na potrzeby developmentu. W przypadku produkcji korzystam ze wsparcia osób specjalizujących się w tym obszarze lub zajmują się tym inne osoby z zespołu.

<div style=padding:56.25% 0 0 0;position:relative;><iframe allow=autoplay; fullscreen; picture-in-picture; clipboard-write frameborder=0 src=https://player.vimeo.com/video/1010135935?badge=0&autopause=0&player\_id=0&app\_id=58479 style=position:absolute;top:0;left:0;width:100%;height:100%; title=01\_05\_vps></iframe></div><script src=https://player.vimeo.com/api/player.js></script>

Podsumowując konfigurację przedstawioną na filmie:

1. **Dostęp VPS:** Wykup dostęp do serwera VPS: DigitalOcean lub Mikr.us
1. **Nowy serwer:** Utwórz nowy droplet (digitalocean) działający na Ubuntu, z minimum 2GB RAM (rekomendowane 4GB). Do autoryzacji wykorzystaj klucz SSH (możesz wygenerować go poleceniem ssh-keygen), a następnie skopiuj treść klucza publicznego z pliku z końcówką .pub.
1. **Połączenie:** Połącz się z serwerem korzystając z polecenia  ssh root@adres\_ip\_serwera -i ~/.ssh/nazwa\_klucza\_prywatnego
1. **Nginx:** Zainstaluj nginx
1. **Server Block:** Utwórz server block w /etc/nginx/sites-available powiązany z Twoją domeną lub subdomeną
1. **Aktywacja Server Block:** Aktywuj server block poleceniem sudo ln -s /etc/nginx/sites-available/your\_domain /etc/nginx/sites-enabled/, sprawdź konfigurację nginx nginx -t i jeśli się wszystko zgadza przeładuj ją poleceniem sudo service nginx reload.
1. **Konfiguracja domeny:** Dodaj rekord A Twojej domeny, ustawiając go na adres IP serwera
1. **Let's Encrypt:** Zainstaluj certbot i wygeneruj certyfikat let's encrypt dla Twojej domeny
1. **Node.js:** Zainstaluj najnowszą wersję node.js i bun
1. **Serwer Node.js:** Pobierz [ten przykładowy kod](https://cloud.overment.com/aidevs3_vps-1726560176.zip) i umieść go na serwerze. Następnie uzupełnij plik .env swoim kluczem API oraz dowolnym ciągiem znaków dla klucza PERSONAL\_API\_KEY
1. **Zainstaluj pm2:** npm install pm2@latest -g i uruchom serwer Node.js poleceniem pm2 start bun -- start
1. Wyślij zapytanie do serwera:

curl --request POST \
--url https://twojadomena.com/api/chat \
--header 'Authorization: Bearer PERSONAL API KEY' \
--header 'Content-Type: application/json' \
--data '{ "messages": [ { "content": "hey", "role": "user" } ] }'

W dalszej części AI\_devs 3, posiadanie własnego serwera na którym działa aplikacja udostępniająca nasze prywatne API, może okazać się bardzo przydatne. Choć nie jest to wymagane do dalszej nauki, to z pewnością dobrym pomysłem jest stworzenie własnego "produkcyjnego" środowiska pracy.
## Zarządzanie promptami
Do tej pory treść promptów przechowywaliśmy w kodzie aplikacji. W przypadku prostych instrukcji oraz etapu prototypu, może to być wystarczające. Szybko jednak można przekonać się o tym, że wprowadzanie nawet najmniejszych zmian, szczególnie w zespole, staje się sporym wyzwaniem. Co więcej, przykład memory omawiany w poprzedniej lekcji dość dobrze obrazuje trudność w monitorowaniu kolejnych wersji promptów. Jednocześnie LangFuse (i podobne narzędzia, takie jak chociażby [Agenta.ai](https://agenta.ai/)) dają możliwość zarządzania promptami i ich wersjonowaniem.

W przykładzie prompts w pliku AssistantService znajduje się metoda answer, która w przeciwieństwie do tego, co robiliśmy wcześniej, nie wczytuje promptu z pliku, lecz pobiera go bezpośrednio z LangFuse.

![](https://cloud.overment.com/2024-09-17/aidevs3_prompts-eb680ed8-7.png)

Sam prompt został zdefiniowany w panelu, w zakładce "Prompts". Możemy w nim definiować zmienne, które podczas wczytywania lub kompilacji instrukcji są zastępowane docelowymi wartościami. Po wprowadzeniu zmian zapisywana jest nowa wersja, do której możemy przypisać własne etykiety.

**UWAGA:** Aby uruchomić przykład, oczywiście należy samodzielnie dodać do LangFuse prompt o nazwie "Answer" i nawet prostej treści "As Alice, you're speaking to ...".

![](https://cloud.overment.com/2024-09-17/aidevs3_manageprompts-262c6fdf-4.png)

Zarządzanie promptami po stronie LangFuse ma jedną definitywną przewagę — monitorowanie. Każda z zapisanych instrukcji może być połączona z interakcją użytkowników, co ułatwia późniejsze przeglądanie zarówno aktywności z perspektywy sesji, użytkownika, jak i samego promptu. Co więcej, prompt może zostać automatycznie zweryfikowany dzięki funkcjonalności 'Evaluation', w której możemy skonfigurować testy.

![](https://cloud.overment.com/2024-09-17/aidevs3_track-1799b624-e.png)

Automatyczna ewaluacja dostarcza informacji na temat jakości odpowiedzi generowanych przez model, poprzez ocenę oraz krótki komentarz.

![](https://cloud.overment.com/2024-09-17/aidevs3_evaluate-5e2513c4-7.png)

Ostatnią rzeczą, na którą warto zwrócić uwagę na tym etapie, jest uwzględnienie **identyfikatorów użytkownika** i powiązanie ich z logami LangFuse. Pozwala to na przegląd jego interakcji, ewentualne debugowanie, a także wgląd w ogólne statystyki.

![](https://cloud.overment.com/2024-09-17/aidevs3_user-18d2f73c-9.png)

Dopasowanie monitorowania do własnej aplikacji, będzie różnić się w zależności od przypadku. Zdecydowanie dobrym pomysłem jest zapoznanie się z interaktywnym demo, dostępnym [w dokumentacji Langfuse](https://langfuse.com/docs/demo).

![](https://cloud.overment.com/2024-09-17/aidevs3_demo-527a2980-a.png)

Jeśli chodzi o dalsze konfiguracje, to w kolejnych przykładach będziemy dążyć do pełnego monitorowania (z pewnymi wyjątkami). Kluczowe będzie wyrobienie nawyku domyślnego korzystania z narzędzi do monitorowania (nie musi to być Langfuse).
## Baza danych
Kolejnym elementem produkcyjnej aplikacji jest baza danych. W tym obszarze obecność dużych modeli językowych raczej nie wprowadza zbyt dużych zmian, w porównaniu do klasycznych aplikacji. Z pewnością będziemy chcieli zapisywać w niej **historię interakcji z modelem**, **dane na potrzeby RAG**, a niekiedy także dynamiczne elementy promptów, takie jak chociażby **instrukcje obsługi narzędzi agentów**.

Pomiędzy produkcyjną a lokalną bazą danych musi być utrzymana spójność struktury. Zapewnia to proces migracji, w ramach którego opisujemy sposób organizacji danych oraz zmiany, które będą zachodziły wraz z rozwojem aplikacji. Natomiast same informacje przechowywane w bazie, będą się różnić w zależności od środowiska. Tutaj dzięki wspomnianemu procesowi seedowania, będziemy mogli wypełniać bazę przykładowymi danymi. Zarówno proces migracji jak i seed'owania leży po stronie osób zajmujących się rozwojem back-endu, zatem jeśli pracujesz na front-endzie to zapamiętaj tylko, aby **baza produkcyjna i lokalna posiadały taką samą strukturę i możliwie zbliżoną zawartość, ale nigdy nie mogą być ze sobą bezpośrednio połączone**.

Aby doświadczyć pracy z bazami danych w praktyce, w przykładzie database uwzględniam integrację z SQLite dzięki [Drizzle ORM](https://orm.drizzle.team). Nie potrzebujemy więc instalacji serwera, którego wymaga chociażby PostgreSQL, a cała baza danych zostanie zapisana w pliku database.db, który po uruchomieniu przykładu, pojawi się w jego katalogu.

Po przesłaniu zapytania do aplikacji na endpoint /api/chat, zostanie uruchomiony fragment kodu odpowiedzialny za dodanie nowego wpisu do tabeli messages, którego treść będziemy mogli w przyszłości odczytać.

![](https://cloud.overment.com/2024-09-17/aidevs3_entry-5c6e7fa3-3.png)

Dane przechowywane w bazie możemy łatwo przeglądać z pomocą graficznych interfejsów, takich jak chociażby [TablePlus](https://tableplus.com/) lub dowolnej alternatywy obsługującej SQLite. Po uruchomieniu pliku database.db, wewnątrz tabeli messages znajdziemy historię interakcji z modelem.

![](https://cloud.overment.com/2024-09-17/aidevs3_db-8cf06ee2-9.png)

Jeśli bazy danych stanowią dla Ciebie nowe zagadnienie, to koniecznie uruchom przykład database i przyjrzyj się temu, jak zapisywane są informacje w pliku DatabaseService.ts oraz jak budowana jest struktura tabeli. Tutaj bardzo pomocna jest wiedza na temat języka SQL (którego podstawy można opanować bardzo szybko i tutaj może pomóc nam także LLM). Szybko przekonasz się, że bazy danych to w uproszczeniu tabele, w których organizujemy dane aplikacji, a następnie odczytujemy i zapisujemy je z pomocą kodu.

Od tej pory w większości przykładów będziemy wykorzystywać SQLite na potrzeby przechowywania danych. Z powodzeniem możesz także pracować z nim na potrzeby prywatnych projektów.
## Silniki wyszukiwania
W lekcji S01E04 — Techniki optymalizacji przeszliśmy przez mały wstęp na temat baz wektorowych, stosując vector store faiss. Jednak w praktyce będziemy sięgać po znacznie bardziej rozbudowane narzędzia, takie jak Qdrant, który jest dostępny zarówno na świetnym planie bezpłatnym oraz w wersji Open Source.

Techniki pracy z bazą wektorową będziemy omawiać jeszcze w dalszej części AI\_devs. Tymczasem w przykładzie qdrant znajduje się bardzo prosta implementacja, zapisująca historię rozmów oraz wczytująca je do kontekstu. Mechanizm ten nie jest szczególnie użyteczny, lecz kluczowe jest samo podłączenie z Qdrant.

Przed uruchomieniem przykładu, załóż bezpłatne konto w Qdrant Cloud i pobierz adres URL bazy oraz klucz API i dodaj je do pliku .env. Następnie po przesłaniu pierwszego zapytania na endpoint /api/chat, zostanie zainicjalizowana kolekcja, a wewnątrz niej pojawią się pierwsze punkty (czyli wpisy).

![](https://cloud.overment.com/2024-09-17/aidevs3_collection-4c3aa233-1.png)

Jeśli wszystko zostało odpowiednio podłączone, to model będzie w stanie odpowiadać na pytania, posługując się top-10 najbardziej istotnych wiadomości. Natomiast z produkcyjnego punktu widzenia, jest tutaj kilka istotnych detali:

- Dane w bazie wektorowej przechowywane są w formie embeddingu oraz powiązanych z nimi metadanych. Embedding generowany jest przez model (w naszym przypadku text-embedding-3-large) i jest to pierwszy problem, z którym należy się liczyć, ponieważ wybranego modelu nie można zastąpić innym bez **ponownego indeksowania całej bazy**. W przypadku bardzo dużych baz danych może okazać się to dość kosztowne.
- Embedding, jak wiemy, opisuje znaczenie treści w formie liczb. Jednak modele, które go generują mają różną skuteczność w zależności od języka (np. polski / angielski), co również rodzi problemy z punktu widzenia rozwoju aplikacji.
- Wyszukiwanie z pomocą bazy wektorowej jest już powszechnie uznawane za niewystarczające (choć bardzo wartościowe). Oznacza to, że w architekturze aplikacji musimy uwzględnić także inne silniki wyszukiwania oraz strategie organizacji treści.
- W praktyce będzie nam zależało na tym, aby **te same dane opisywać na różne sposoby** w celu zwiększenia skuteczności procesu wyszukiwania. Np. poza oryginalną treścią opisu produktu, może nam zależeć na indeksowaniu także jego pojedynczych cech. Takie przetwarzanie utrudnia aktualizowanie, synchronizację oraz późniejsze przeszukiwanie bazy danych.
- Baza wektorowa nie zastępuje nam klasycznej bazy danych, a więc informacje pomiędzy nimi muszą być synchronizowane. Rodzi to ryzyko rozwarstwienia danych, co również musimy uwzględnić na etapie developmentu.
- Wiemy, że skuteczność wypowiedzi LLM zależy od jakości promptu oraz zawartego w nim kontekstu. Skoro kontekst ten budowany jest dynamicznie na podstawie wyników wyszukiwania, to tutaj również będzie zależało nam na ewaluacji obejmującej monitorowanie skuteczności całego procesu.

Zatem, baza wektorowa to dodatkowy komponent aplikacji, który pod kątem złożoności można zestawić z każdym innym silnikiem wyszukiwania. Natomiast tutaj dodatkowa trudność polega na nowych technikach pracy z indeksowaniem oraz przeszukiwaniem treści, o czym będziemy mogli się jeszcze przekonać.
## Dynamika zmian i nowe wersje modeli
W sieci dużo mówi się na temat szybkiego rozwoju LLM oraz związanych z tym problemów z migracją na nowsze wersje. W rzeczywistości trudność związana z przełączaniem na najnowsze modele zwykle jest mniejsza niż mogłoby się wydawać, ponieważ charakteryzują się one znacznie lepszą skutecznością. Tym bardziej, że dysponując narzędziami do automatycznej ewaluacji promptów, możemy sprawdzić działanie nowych modeli dla naszego kontekstu.

Zatem zawsze, gdy pojawia się nowy model, warto brać pod uwagę chociażby jego pozycję w benchmarkach (np. [LMSYS](https://lmsys.org/blog/2023-05-03-arena/) czy [LiveBench](https://livebench.ai/)), ale ostateczną decyzję o jego wyborze, należy podjąć po przeprowadzeniu własnych testów.

W lekcji S00E04 — Programowanie pisałem na temat budowania warstwy abstrakcji, dzięki której możliwe jest skorzystanie z modeli różnych dostawców. Świetną opcją jest także praca z chociażby Vercel AI SDK czy podobnymi narzędziami, które ułatwiają pracę z wieloma modelami.

Przez większość AI\_devs 3, nasza uwaga będzie skupiona na modelach SOTA. Jednak trzeba pamiętać także o modelach Open Source, zwłaszcza tych zdolnych do działania na urządzeniach mobilnych. Przykłady modeli takich jak te z rodziny Phi czy Qwen oraz ogólny kierunek Apple Intelligence pokazują, że małe modele językowe mogą odegrać jeszcze istotną rolę w obszarze generatywnego AI.

Ostatecznie w kwestii dynamiki zmian, jako największe ograniczenia można wskazać:

- Pozostawanie na bieżąco zarówno z modelami, narzędziami, jak i technikami pracy z nimi. Tutaj bardzo może pomóc podążanie za sugestiami z lekcji S00E05 — Rozwój.
- Architektura aplikacji i decyzje projektowe uzależniające nas od wybranego zestawu narzędzi. Tutaj dużo na ten temat mówiliśmy w lekcji S00E04 — Programowanie, a wątki związane z zachowaniem elastyczności, pojawiają się praktycznie na każdym kroku.
- Wątki biznesowe oraz prawne również mogą stanowić bardzo poważne ograniczenie z perspektywy rozwoju aplikacji. Przykładem może być scenariusz w którym organizacja przeszła przez proces umożliwiający dostęp do modeli OpenAI, ale nie ma dostępu do modeli Anthropic, które nierzadko okazują się znacznie lepsze.

Pomimo wszystko, temat zachowania wysokiej dynamiki rozwoju aplikacji, to w największym stopniu problem dotyczący technologii, powiązany z kulturą produktową obecnej w firmie oraz nastawienia do rozwoju poszczególnych osób z zespołu. Warto więc podejmować inicjatywy mające na celu wymianę wiedzy wewnątrz organizacji i/lub grup projektowych.
## Podsumowanie
Poza wymienionymi wątkami dotyczącymi rozwoju aplikacji od strony technologii, zastosowanie generatywnego AI nie jest uzależnione wyłącznie od kwestii technicznych. Możliwości modeli językowych wzbudzają skrajne emocje, od tych najbardziej pozytywnych, do skrajnie negatywnych. W obu przypadkach wartość, którą otrzymujemy z zastosowania tej technologii jest niska, bo albo próbujemy stosować ją tam, gdzie zwyczajnie się nie sprawdza, albo korzystamy z jej możliwości w ogóle. Warto się nad tym zastanowić.

Tymczasem jedna rzecz z tej lekcji, której warto poświęcić czas polega na skonfigurowaniu swojego prywatnego API z pomocą wybranego języka programowania i dowolnych narzędzi — własny serwer, VPS czy serverless. Moment w którym duży model językowy stanie się dla nas dostępny wszędzie, a my będziemy mieć możliwość dopasowania jego zachowania do siebie, jest początkiem ścieżki AI\_devs 3.
