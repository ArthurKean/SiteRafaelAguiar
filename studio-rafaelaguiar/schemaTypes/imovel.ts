import {defineArrayMember, defineField, defineType} from 'sanity'

const hasOptions = (doc: Record<string, unknown> | undefined) => Array.isArray(doc?.plantas) && doc.plantas.length > 0
const imageFields = [defineField({name: 'alt', title: 'Descrição da imagem', type: 'string'})]
const imageArray = () => [defineArrayMember({type: 'image', options: {hotspot: true}, fields: [
  defineField({name: 'titulo', title: 'Nome / pavimento', type: 'string', description: 'Ex.: Térreo, Pavimento superior, Sala.'}), ...imageFields,
]})]
const quantities = () => ['quartos', 'suites', 'banheiros', 'vagas'].map((name, i) => defineField({
  name, title: ['Quartos (total, incluindo suítes)', 'Suítes', 'Banheiros (total)', 'Vagas de garagem'][i], type: 'number',
  validation: r => [r.integer().min(0), r.custom((value, ctx) => {
    if (value == null) return 'Preencha se conhecido; campos vazios não aparecem nos detalhes da opção.'
    if (name === 'suites' && typeof ctx.parent === 'object' && ctx.parent && 'quartos' in ctx.parent && typeof ctx.parent.quartos === 'number' && value > ctx.parent.quartos) return 'Confira: suítes não devem exceder o total de quartos.'
    return true
  }).warning()],
}))
export const imovelType = defineType({
  name: 'imovel', title: 'Imóveis', type: 'document',
  groups: [
    {name: 'basico', title: 'Informações básicas', default: true},
    {name: 'opcoes', title: 'Valores e opções'},
    {name: 'fotos', title: 'Fotos'},
    {name: 'localizacao', title: 'Localização'},
    {name: 'publicacao', title: 'Publicação'},
    {name: 'legado', title: 'Dados anteriores / avançados'},
  ],
  fields: [
    defineField({name: 'titulo', title: 'Nome do imóvel', type: 'string', group: 'basico', validation: r => r.required()}),
    defineField({name: 'slug', title: 'Link do imóvel', type: 'slug', group: 'basico', options: {source: 'titulo', maxLength: 96}, description: 'Não altere o link de um imóvel já publicado.', validation: r => r.required()}),
    defineField({name: 'tipo', title: 'Tipo de imóvel', type: 'string', group: 'basico', options: {list: ['Apartamento', 'Cobertura', 'Casa', 'Terreno', 'Comercial']}}),
    defineField({name: 'status', title: 'Etapa do empreendimento', type: 'string', group: 'basico', options: {list: ['Lançamento', 'Em construção', 'Na planta', 'Pronto para morar']}}),
    defineField({name: 'construtora', title: 'Construtora', type: 'string', group: 'basico'}),
    defineField({name: 'entrega', title: 'Previsão de entrega', type: 'date', group: 'basico'}),
    defineField({name: 'descricaoCurta', title: 'Descrição curta', type: 'string', group: 'basico'}),
    defineField({name: 'descricao', title: 'Descrição completa', type: 'text', rows: 8, group: 'basico'}),
    defineField({name: 'comodidades', title: 'Lazer e diferenciais gerais', type: 'array', group: 'basico', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'plantas', title: 'Opções do imóvel', group: 'opcoes', type: 'array',
      description: 'Cadastre cada opção uma única vez. O site calcula a faixa de área, o menor preço e as maiores quantidades dos cards. Pavimentos são imagens dentro da mesma opção. Cadastre uma opção mesmo quando houver apenas uma unidade.',
      of: [defineArrayMember({name: 'planta', title: 'Opção', type: 'object', fields: [
        defineField({name: 'nome', title: 'Nome da opção', type: 'string', description: 'Ex.: Duplex, Casa com piscina, Apartamento tipo A. Diferencia opções com a mesma metragem.'}),
        defineField({name: 'area', title: 'Área (m²)', type: 'number', validation: r => r.required().positive()}),
        defineField({name: 'preco', title: 'Preço desta opção (R$)', type: 'number', description: 'Ex.: 2079000 para R$ 2.079.000,00.', validation: r => r.required().positive()}),
        ...quantities(),
        defineField({name: 'descricaoSuites', title: 'Detalhe da configuração', type: 'string', description: 'Ex.: 2 suítes + 1 reversível.'}),
        defineField({name: 'unidade', title: 'Unidade (se específica)', type: 'string'}),
        defineField({name: 'orientacao', title: 'Posição solar', type: 'string'}),
        defineField({name: 'desenhos', title: 'Plantas e pavimentos', type: 'array', description: 'Adicione todos os desenhos: térreo, superior, cobertura. Informe o nome de cada imagem.', of: imageArray()}),
        defineField({name: 'fotos', title: 'Fotos exclusivas desta opção (opcional)', type: 'array', description: 'Não precisa repetir as fotos gerais do empreendimento.', of: imageArray()}),
        defineField({name: 'imagem', title: 'Planta anterior', type: 'image', options: {hotspot: true}, fields: imageFields,
          description: 'Imagem do cadastro antigo, preservada no site. Para usar somente a nova lista, remova esta imagem após copiá-la para Plantas e pavimentos.', hidden: ({value}) => !value}),
      ], preview: {select: {nome: 'nome', area: 'area', preco: 'preco', unidade: 'unidade'}, prepare: ({nome, area, preco, unidade}) => ({
        title: [nome, area != null ? `${area} m²` : 'Preencha a área'].filter(Boolean).join(' · '),
        subtitle: [preco != null ? Number(preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : 'Preencha o preço', unidade].filter(Boolean).join(' · '),
      })}})],
      validation: r => r.custom((value, ctx) => value?.length || (ctx.document?.preco != null && ctx.document?.area != null) ? true : 'Adicione ao menos uma opção com área e preço.'),
    }),
    defineField({name: 'imagemPrincipal', title: 'Capa do anúncio', group: 'fotos', type: 'image', options: {hotspot: true}, fields: imageFields, validation: r => r.required()}),
    defineField({name: 'galeria', title: 'Fotos gerais do empreendimento', group: 'fotos', type: 'array', of: imageArray()}),
    defineField({name: 'imagemApresentacao', title: 'Imagem de “Imagine seus dias”', group: 'fotos', type: 'image', options: {hotspot: true}, fields: imageFields,
      description: 'Escolha uma imagem horizontal. Se vazia, o site mantém a segunda imagem da lista, como antes.'}),
    defineField({name: 'cidade', title: 'Cidade', group: 'localizacao', type: 'string', initialValue: 'São Luís'}),
    defineField({name: 'bairro', title: 'Bairro', group: 'localizacao', type: 'string'}),
    defineField({name: 'entorno', title: 'Endereço e informações da localização', group: 'localizacao', type: 'text', rows: 3}),
    defineField({name: 'mapaUrl', title: 'Link para abrir no Google Maps', group: 'localizacao', type: 'url'}),
    defineField({name: 'mapaEmbedUrl', title: 'Mapa dentro do site', group: 'localizacao', type: 'url', description: 'Google Maps > Compartilhar > Incorporar mapa. Cole somente a URL entre aspas depois de src=.',
      validation: r => r.custom(value => !value || /^https:\/\/(?:(?:www\.)?google\.com\/maps\/embed(?:[/?]|$)|maps\.google\.com\/maps\?)/.test(value) || 'Use a URL de incorporação do Google Maps.')}),
    defineField({name: 'ativo', title: 'Exibir no site', group: 'publicacao', type: 'boolean', initialValue: true}),
    defineField({name: 'destaque', title: 'Destacar na página inicial', group: 'publicacao', type: 'boolean', initialValue: false}),
    defineField({name: 'preco', title: 'Preço inicial anterior (R$)', group: 'legado', type: 'number', description: 'Usado apenas quando não há opções. Com opções, o preço é calculado automaticamente.', validation: r => r.min(0).custom((v, ctx) => hasOptions(ctx.document) || v != null ? true : 'Preencha o preço ou cadastre uma opção.')}),
    defineField({name: 'precoMaximo', title: 'Preço máximo anterior (R$)', group: 'legado', type: 'number', validation: r => r.min(0)}),
    defineField({name: 'area', title: 'Área mínima anterior (m²)', group: 'legado', type: 'number', validation: r => r.positive().custom((v, ctx) => hasOptions(ctx.document) || v != null ? true : 'Preencha a área ou cadastre uma opção.')}),
    defineField({name: 'areaMaxima', title: 'Área máxima anterior (m²)', group: 'legado', type: 'number', validation: r => r.min(0)}),
    ...quantities().map(field => ({...field, group: 'legado', description: 'Compatibilidade com o cadastro anterior. Preencha as quantidades em cada opção; o site não pressupõe que todas sejam iguais.'})),
    defineField({name: 'descricaoSuites', title: 'Configuração geral anterior', group: 'legado', type: 'string'}),
    defineField({name: 'coordenadas', title: 'Coordenadas', group: 'legado', type: 'geopoint'}),
    defineField({name: 'demonstracao', title: 'Cadastro de demonstração', group: 'legado', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'titulo', media: 'imagemPrincipal', subtitle: 'bairro'}},
})
